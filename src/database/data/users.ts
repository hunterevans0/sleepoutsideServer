import { z } from "zod"; 
import * as argon2 from 'argon2'

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
  addressIds: z.array(z.string()), // Option to save address only at checkout
  joinDate: z.date(),
  role: z.enum(['admin', 'user'])
});

// Create users
async function createUsers(): Promise<User[]> {
  const adminPasswordHash = await argon2.hash("admin123");
  const userPasswordHash = await argon2.hash("user123");

  const users: User[] = [
    {
      id: "1",
      name: "Admin",
      email: "admin@example.com",
      password: adminPasswordHash,
      addressIds: [],
      joinDate: new Date(),
      role: 'admin'
    },
    {
      id: "2",
      name: "User",
      email: "user@example.com",
      password: userPasswordHash,
      addressIds: [],
      joinDate: new Date(),
      role: 'user'
    },
  ];

  // Optional: validate with Zod
  users.forEach(user => UserSchema.parse(user));

  return users;
}

// Example usage
createUsers().then(users => {
  console.log(users);
});
