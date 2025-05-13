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

    accounts_created = 0
    admin_count = 0
    cleaner_count = 0
    homeowner_count = 0
    platform_management_count = 0

    plain_password = "Password123"
    hashed_password = bcrypt.hashpw(plain_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    for i in range(1, 121):

        # move hashed pw creation here later

        # create roles for users based on index
        if i <= 5:
            role = "admin"
            username = f"admin{i}"
            admin_count += 1
        elif i <= 40:
            role = "cleaner"
            username = f"cleaner{i}"
            cleaner_count += 1
        elif i <= 115:
            role = "home owner"
            username = f"ho{i}"
            homeowner_count += 1
        else:
            role = "platform management"
            username = f"pm{i}"
            platform_management_count += 1

        try:
            sql = "INSERT INTO users (username, password, status, role) VALUES (%s, %s, %s, %s)"
            values = (username, hashed_password, "active", role)
            cursor.execute(sql, values)
            accounts_created += 1
        except mysql.connector.Error as err:
            print(f"Error inserting {username}: {err}")

    conn.commit()
    print(f"{accounts_created} users created with roles successfully.")
    print(f"{admin_count} admins.")
    print(f"{cleaner_count} cleaners.")
    print(f"{homeowner_count} home owners.")
    print(f"{platform_management_count} platform mangement.")

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
            "Bathroom sanitation"
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

    for i in range(6, 41):  # cleaner11 to cleaner70
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

    homeowners = [f"ho{i}" for i in range(41, 116)]  # 70 home owners
    cleaners = [f"cleaner{i}" for i in range(6, 41)]  # 60 cleaners

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

            # Step 2: 65% chance to shortlist
            if random.random() < 0.65 and cleaner in services_by_cleaner and services_by_cleaner[cleaner]:
                service_id = random.choice(services_by_cleaner[cleaner])
                try:
                    cursor.execute("""
                        INSERT INTO Shortlist (homeowner_username, service_id)
                        VALUES (%s, %s)
                    """, (ho, service_id))
                    shortlist_count += 1

                    # Step 3: 55% chance to transact after shortlisting
                    if random.random() < 0.55:
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
# admin1 - admin5
# cleaner6 - cleaner40
# ho41 - ho115
# pm116 - pm120

create_user_accounts()
create_services()
generate_transaction_data()