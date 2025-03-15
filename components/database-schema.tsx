import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function DatabaseSchema() {
  const tables = [
    {
      name: "users",
      description: "Stores user account information",
      columns: [
        { name: "id", type: "uuid", constraints: ["primary key"] },
        { name: "email", type: "varchar", constraints: ["unique", "not null"] },
        { name: "name", type: "varchar", constraints: ["not null"] },
        { name: "password_hash", type: "varchar", constraints: ["not null"] },
        { name: "created_at", type: "timestamp", constraints: ["not null"] },
        { name: "updated_at", type: "timestamp", constraints: ["not null"] },
      ],
    },
    {
      name: "products",
      description: "Stores product information",
      columns: [
        { name: "id", type: "uuid", constraints: ["primary key"] },
        { name: "name", type: "varchar", constraints: ["not null"] },
        { name: "description", type: "text", constraints: ["not null"] },
        { name: "user_id", type: "uuid", constraints: ["foreign key (users.id)"] },
        { name: "created_at", type: "timestamp", constraints: ["not null"] },
        { name: "updated_at", type: "timestamp", constraints: ["not null"] },
      ],
    },
    {
      name: "ideas",
      description: "Stores product ideas and suggestions",
      columns: [
        { name: "id", type: "uuid", constraints: ["primary key"] },
        { name: "title", type: "varchar", constraints: ["not null"] },
        { name: "description", type: "text", constraints: ["not null"] },
        { name: "product_id", type: "uuid", constraints: ["foreign key (products.id)"] },
        { name: "user_id", type: "uuid", constraints: ["foreign key (users.id)"] },
        { name: "status", type: "varchar", constraints: ["not null"] },
        { name: "created_at", type: "timestamp", constraints: ["not null"] },
        { name: "updated_at", type: "timestamp", constraints: ["not null"] },
      ],
    },
    {
      name: "votes",
      description: "Stores user votes on ideas",
      columns: [
        { name: "id", type: "uuid", constraints: ["primary key"] },
        { name: "idea_id", type: "uuid", constraints: ["foreign key (ideas.id)"] },
        { name: "user_id", type: "uuid", constraints: ["foreign key (users.id)"] },
        { name: "value", type: "integer", constraints: ["not null"] },
        { name: "created_at", type: "timestamp", constraints: ["not null"] },
      ],
    },
    {
      name: "comments",
      description: "Stores comments on ideas",
      columns: [
        { name: "id", type: "uuid", constraints: ["primary key"] },
        { name: "idea_id", type: "uuid", constraints: ["foreign key (ideas.id)"] },
        { name: "user_id", type: "uuid", constraints: ["foreign key (users.id)"] },
        { name: "content", type: "text", constraints: ["not null"] },
        { name: "created_at", type: "timestamp", constraints: ["not null"] },
        { name: "updated_at", type: "timestamp", constraints: ["not null"] },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Database Schema
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Complete database schema documentation for Supercivilization
        </p>
      </div>

      <div className="space-y-8">
        {tables.map((table) => (
          <Card key={table.name}>
            <CardHeader>
              <CardTitle>
                <code className="text-lg">{table.name}</code>
              </CardTitle>
              <CardDescription>{table.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Column</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Constraints</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.columns.map((column) => (
                    <TableRow key={column.name}>
                      <TableCell>
                        <code>{column.name}</code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-mono">
                          {column.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 flex-wrap">
                          {column.constraints.map((constraint) => (
                            <Badge
                              key={constraint}
                              variant="outline"
                              className="font-mono text-xs"
                            >
                              {constraint}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 