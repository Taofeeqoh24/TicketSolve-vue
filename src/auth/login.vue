<template>
  <div class="flex items-center justify-center h-screen">
    <div class="mx-auto p-10 bg-white rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

      <form class="flex flex-col gap-2 w-72 lg:w-96" @submit.prevent="onLogin">
        <label>Email:</label>
        <input
          v-model="form.email"
          type="email"
          placeholder="Enter a valid email address"
          class="p-2 border border-gray-300 rounded"
        />
        <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>

        <label>Password:</label>
        <input
          v-model="form.password"
          type="password"
          class="p-2 border border-gray-300 rounded"
        />
        <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>

        <button type="submit" class="p-2 bg-purple-500 rounded text-white font-bold">
          Submit
        </button>

        <div class="text-center">
          <p class="text-xs font-semibold">
            Don't have an account?
            <span
              class="text-purple-800 font-bold hover:underline cursor-pointer"
              @click="$router.push('/register')"
            >
              Signup
            </span>
          </p>
        </div>
      </form>
    </div>
  </div>

  <footer class="flex items-center justify-center p-4 shadow-md mx-auto text-white bg-gray-700 font-bold">
    <aside class="text-center text-sm">
      <p>Copyright &copy; Taofeeqoh 2025 - All Right Reserved</p>
      <p>Designed for HNG 13 - Stage 2 Task</p>
    </aside>
  </footer>
</template>

<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { z } from "zod"
import { useToast } from "vue-toastification"
import "vue-toastification/dist/index.css"

const router = useRouter()
const toast = useToast()

const form = reactive({
  email: "",
  password: ""
})

const errors = reactive({
  email: "",
  password: ""
})

// ✅ Zod validation schema
const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

function onLogin() {
  errors.email = ""
  errors.password = ""

  // Validate form
  const validation = schema.safeParse(form)

  if (!validation.success) {
    const zodError = validation.error?.issues || []
    zodError.forEach((err) => {
      if (err.path && err.path[0]) {
        errors[err.path[0]] = err.message
      }
    })

    toast.error("Fix the errors in the form!")
    return
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]")
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === form.email.toLowerCase() &&
      u.password === form.password
  )

  if (user) {
    localStorage.setItem("user", JSON.stringify(user))
    toast.success("Login successful!")
    setTimeout(() => router.push("/dashboard"), 1000)
  } else {
    toast.error("Invalid email or password!")
    setTimeout(() => router.push("/register"), 1000)
  }
}
</script>
