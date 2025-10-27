<template>
  <div class="flex items-center justify-center h-screen">
    <div class="mx-auto p-10 bg-white rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-6 text-center">Signup</h1>

      <form class="flex flex-col gap-2 w-72 lg:w-96" @submit.prevent="onSubmit">
        <label>Name:</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Username"
          class="p-2 border border-gray-300 rounded"
        />
        <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>

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

        <label>Confirm Password:</label>
        <input
          v-model="form.confirmPassword"
          type="password"
          class="p-2 border border-gray-300 rounded"
        />
        <span v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</span>

        <button type="submit" class="p-2 bg-purple-500 rounded text-white font-bold">
          Submit
        </button>

        <div class="text-center">
          <p class="text-xs font-semibold">
            Already have an account?
            <span
              class="text-purple-800 font-bold hover:underline cursor-pointer"
              @click="$router.push('/login')"
            >
              Sign In
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
import { ref, reactive } from "vue"
import { z } from "zod"
import { useToast } from "vue-toastification"
import "vue-toastification/dist/index.css"
import { useRouter } from "vue-router"

const router = useRouter()
const toast = useToast()

const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
})

const errors = reactive({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
})

// 🧩 Zod schema
const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

function onSubmit() {
  errors.name = ""
  errors.email = ""
  errors.password = ""
  errors.confirmPassword = ""

  console.log("Form Data:", form.value);

  const validation = schema.safeParse(form.value)
  console.log("Validation Result:", validation);

  if (!validation.success) {
    const zodError = validation.error?.issues || []
    console.log("Zod errors:", zodError)
    zodError.forEach((err) => {
      console.log("Processing error for path:", err.path[0], err.message);
      
      if (err.path && err.path[0]) {
        errors[err.path[0]] = err.message
      }
    })

    console.log("final errors object:", errors);
    toast.error("Fix the errors in the form!")
    return
  }
  const users = JSON.parse(localStorage.getItem("users") || "[]")
  const userExists = users.find((user) => user.email === form.value.email)

  if (userExists) {
    toast.error("User already registered!")
    return
  }

  users.push({
    name: form.value.name,
    email: form.value.email,
    password: form.value.password,
  })

  localStorage.setItem("users", JSON.stringify(users))
  toast.success("Registration successful!")

  setTimeout(() => router.push("/login"), 1500)
}
</script>
