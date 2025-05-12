import bcrypt

password = "Password123"
hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode()
print(hashed)
