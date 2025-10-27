<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-4 bg-white lg:p-6 p-1 rounded-lg shadow-md">
    <div>
      <label class="block font-semibold mb-1">Title</label>
      <input
        v-model="form.title"
        placeholder="Enter ticket title"
        aria-label="Title"
        class="border border-gray-300 rounded p-2 w-full"
      />
      <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
    </div>

    <!-- Description -->
    <div>
      <label class="block font-semibold mb-1">Description</label>
      <textarea
        v-model="form.description"
        placeholder="Describe the issue"
        aria-label="description"
        class="border border-gray-300 rounded p-2 w-full"
      ></textarea>
    </div>

    <!-- Status -->
    <div>
      <label class="block font-semibold mb-1">Status</label>
      <select
        v-model="form.status"
        class="border border-gray-300 rounded p-2 w-full"
        aria-label="status"
      >
        <option disabled value="">Select status</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
    </div>

    <button
      type="submit"
      class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md"
    >
      Save Ticket
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { z } from "zod";
import { useToast } from "vue-toastification";

const props = defineProps({
  setActiveTab: {
    type: Function,
    required: true,
  },
});

const toast = useToast();

// 🧩 Zod validation schema
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["open", "in_progress", "closed"], {
    errorMap: () => ({
      message: "Status must be Open, In Progress, or Closed",
    }),
  }),
});

const form = ref({
  title: "",
  description: "",
  status: "",
});

const errors = ref({});

// 🧾 Handle Submit
function onSubmit() {
  const validation = schema.safeParse(form.value);

  if (!validation.success) {
    errors.value = {};
    validation.error.errors.forEach((err) => {
      if (err.path && err.path[0]) {
        errors.value[err.path[0]] = err.message;
      }
    });
    return;
  }

  // Clear errors
  errors.value = {};

  const existingTickets = JSON.parse(localStorage.getItem("tickets")) || [];
  const newTicket = {
    id: Date.now(),
    ...form.value,
  };

  localStorage.setItem("tickets", JSON.stringify([...existingTickets, newTicket]));
  toast.success("Ticket created successfully!");

  // Reset form
  form.value = {
    title: "",
    description: "",
    status: "",
  };

  // Navigate to "My Tickets"
  setTimeout(() => props.setActiveTab("my-tickets"), 1500);
}
</script>
