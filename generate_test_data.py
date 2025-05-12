import mysql.connector
import bcrypt
import random
from datetime import datetime, timedelta
    
def connect_database():
    conn = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "", #for antonio mysql : csit115 #grace
    database = "csit314"
    )
    
    return conn

# ----------------------------- Create user accounts -------------------------------------

# will be slow, because of hashing of pw everytime  
def create_user_accounts():
    conn = connect_database()
    cursor = conn.cursor(dictionary=True)

    plain_password = "Password123"
    accounts_created = 0
    hashed_password = bcrypt.hashpw(plain_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    for i in range(1, 101):
        username = f"user{i}"
        
        # move hashed pw creation here later

        # Determine role based on index
        if i <= 10:
            role = "admin"
            username = f"admin{i}"
        elif i <= 50:
            role = "cleaner"
            username = f"cleaner{i}"
        elif i <= 90:
            role = "home owner"
            username = f"ho{i}"
        else:
            role = "platform management"
            username = f"pm{i}"

        try:
            sql = "INSERT INTO users (username, password, status, role) VALUES (%s, %s, %s, %s)"
            values = (username, hashed_password, "active", role)
            cursor.execute(sql, values)
            accounts_created += 1
        except mysql.connector.Error as err:
            print(f"Error inserting {username}: {err}")

    conn.commit()
    print(f"{accounts_created} users created successfully.")

    cursor.close()
    conn.close()
    
# ----------------------------- Create Services -------------------------------------
    
def create_services():
    service_categories = {
        "Home Cleaning": [
            "Mop the floor",
            "Sweep and vacuum",
            "Dust furniture",
            "Clean kitchen surfaces",
            "Sanitize bathroom"
        ],
        "Outdoor Cleaning": [
            "Power wash driveway",
            "Clean gutters",
            "Trim bushes",
            "Sweep porch",
            "Wash windows"
        ],
        "Vehicular Cleaning": [
            "Interior vacuuming",
            "Exterior wash",
            "Wax and polish",
            "Rim cleaning",
            "Engine bay wipe down"
        ],
        "Deep Cleaning": [
            "Full house disinfection",
            "Carpet deep clean",
            "Fungal removal",
            "Kitchen grease removal",
            "AC vent sanitation"
        ]
    }

    conn = connect_database()
    cursor = conn.cursor(dictionary=True)
    services_created = 0

    for i in range(11, 51):  # user11 to user50
        username = f"cleaner{i}"
        used_combinations = set()

        while len(used_combinations) < 2:
            category = random.choice(list(service_categories.keys()))
            service = random.choice(service_categories[category])
            combo_key = (category, service)

            if combo_key in used_combinations:
                continue  # try a different combo

            price = round(random.uniform(25, 80), 2)

            try:
                sql = "INSERT INTO Services (cleaner_username, category, service, price) VALUES (%s, %s, %s, %s)"
                values = (username, category, service, price)
                cursor.execute(sql, values)
                services_created += 1
                used_combinations.add(combo_key)
            except mysql.connector.Error as err:
                print(f"Error inserting service for {username}: {err}")

    conn.commit()
    print(f"{services_created} services created for cleaners (2 per cleaner, no duplicates).")
    
    cursor.close()
    conn.close()

    
# ----------------------- Create views, shortlist, viewtracker, transactions -----------------------------

def generate_transaction_data():
    conn = connect_database()
    cursor = conn.cursor(dictionary=True)

    homeowners = [f"ho{i}" for i in range(51, 91)]  # 40 home owners
    cleaners = [f"cleaner{i}" for i in range(11, 51)]  # 40 cleaners

    # Get all service_ids mapped to their cleaner
    cursor.execute("SELECT service_id, cleaner_username FROM Services")
    services = cursor.fetchall()

    services_by_cleaner = {}
    for service in services:
        services_by_cleaner.setdefault(service["cleaner_username"], []).append(service["service_id"])

    view_count = 0
    shortlist_count = 0
    transaction_count = 0

    for ho in homeowners:
        # Each homeowner views 3–5 random cleaners
        viewed_cleaners = random.sample(cleaners, random.randint(3, 5))

        for cleaner in viewed_cleaners:
            # Step 1: View
            try:
                cursor.execute("""
                    INSERT INTO CleanerViewTracker (homeowner_username, cleaner_username)
                    VALUES (%s, %s)
                """, (ho, cleaner))
                cursor.execute("""
                    INSERT INTO CleanerViews (username, views)
                    VALUES (%s, 1)
                    ON DUPLICATE KEY UPDATE views = views + 1
                """, (cleaner,))
                view_count += 1
            except mysql.connector.Error as err:
                print(f"View error: {err}")

            # Step 2: 70% chance to shortlist
            if random.random() < 0.7 and cleaner in services_by_cleaner and services_by_cleaner[cleaner]:
                service_id = random.choice(services_by_cleaner[cleaner])
                try:
                    cursor.execute("""
                        INSERT INTO Shortlist (homeowner_username, service_id)
                        VALUES (%s, %s)
                    """, (ho, service_id))
                    shortlist_count += 1

                    # Step 3: 50% chance to transact after shortlisting
                    if random.random() < 0.5:
                        start_date = datetime(2025, 1, 1)
                        end_date = datetime(2025, 3, 31)
                        random_days = random.randint(0, (end_date - start_date).days)
                        transaction_date = (start_date + timedelta(days=random_days)).date()
                        cursor.execute("""
                            INSERT INTO Transactions (homeowner_username, cleaner_username, service_id, date)
                            VALUES (%s, %s, %s, %s)
                        """, (ho, cleaner, service_id, transaction_date))
                        transaction_count += 1
                except mysql.connector.Error as err:
                    print(f"Shortlist/Transaction error: {err}")

    conn.commit()
    print(f"{view_count} views, {shortlist_count} shortlists, {transaction_count} transactions generated.")

    cursor.close()
    conn.close()

    

# Usernames (password: Password123)
# ---------------------------------
# admin1 - admin10 
# cleaner11 - cleaner50
# ho51 - ho90
# pm91 - pm100

create_user_accounts()
create_services()
generate_transaction_data()