export default function UserTable({ users }: { users: any[] }) {
  return (
    <table className="w-full border">
      <thead className="bg-gray-100 dark:bg-gray-700">
        <tr>
          <th>Name</th><th>Email</th><th>Phone</th><th>City</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-t">
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.phone}</td>
            <td>{u.address.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
