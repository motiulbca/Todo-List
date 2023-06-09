
import { prisma } from "../mydb"
import { redirect } from "next/navigation"

async function createTodo(data: FormData) {
  "use server"
  const title = data.get("title")?.valueOf()
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title")
  }
  await prisma.todo.create({ data: { title, complete: false } })
  redirect("/")
}

function getTodos() {
  return prisma.todo.findMany()
}

export default async function Home() {
  const todos = await getTodos()

  return (
    <> 
  <div className="mt-4 flex gap-1 justify-center text-2xl">
    Create New One
  </div>
    <form action={createTodo} className="mt-2 flex gap-2 flex-col">
    <div className="flex gap-1 justify-center">
      <input
        type="text"
        name="title"
        placeholder="Enter Title"
        className="w-96 border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
      />
      </div>
      <div className="flex gap-1 justify-center">
        <button
          type="submit"
          className="border justify-left border-slate-300 bg-red-500 text-white px-2 py-1 rounded hover:bg-black focus-within:bg-slate-700 outline-none"
        >
          Create
        </button>
      </div>
    </form>
      <div className="flex gap-1 justify-center mt-4">
        <h1 className="text-2xl ">Todos</h1>
      </div>
      <ul className="flex gap-1 justify-center">
        {todos.map(todo => (
           <li key={todo.id}>
           <span>{todo.title},{''}</span>
         </li>
        
        ))}
      </ul>
    </>
  )
}