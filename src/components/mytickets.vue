<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <h1 class="text-3xl font-bold mb-6">My Tickets</h1>

    <div v-if="tickets.length === 0" class="text-gray-600">
      No tickets yet.
    </div>

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="bg-white p-4 rounded-lg shadow-md border border-gray-200"
      >
        <h2 class="text-lg font-semibold">{{ ticket.title }}</h2>
        <p class="text-sm text-gray-600 mt-2 mb-2">{{ ticket.description }}</p>

        <span
          class="inline-block text-xs font-semibold px-2 py-1 rounded"
          :class="{
            'bg-green-100 text-green-700': ticket.status === 'open',
            'bg-yellow-100 text-yellow-700': ticket.status === 'in_progress',
            'bg-red-100 text-red-700': ticket.status === 'closed'
          }"
        >
          {{ ticket.status.replace('_', ' ') }}
        </span>

        <div class="flex justify-end gap-2 mt-4">
          <button
            class="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            @click="handleEdit(ticket)"
          >
            Edit
          </button>
          <button
            class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            @click="handleDelete(ticket.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-purple-300/50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Edit Ticket</h2>

        <form @submit.prevent="handleUpdate" class="flex flex-col gap-4">
          <div>
            <label class="block font-semibold mb-1">Title</label>
            <input
              v-model="formData.title"
              type="text"
              class="w-full border px-3 py-2 rounded"
              placeholder="Enter ticket title"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-semibold mb-1">Description</label>
            <textarea
              v-model="formData.description"
              class="w-full border px-3 py-2 rounded"
              placeholder="Enter ticket description"
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-semibold mb-1">Status</label>
            <select
              v-model="formData.status"
              class="w-full border px-3 py-2 rounded"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div class="flex justify-end gap-2 mt-4">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const tickets = ref([]);
const showModal = ref(false);
const selectedTicket = ref(null);

const formData = reactive({
  title: "",
  description: "",
  status: "open",
});

onMounted(() => {
  const stored = JSON.parse(localStorage.getItem("tickets")) || [];
  tickets.value = stored;
});

function handleDelete(id) {
  if (confirm("Are you sure you want to delete this ticket?")) {
    tickets.value = tickets.value.filter((ticket) => ticket.id !== id);
    localStorage.setItem("tickets", JSON.stringify(tickets.value));
    toast.success("Ticket deleted successfully!");
  }
}

function handleEdit(ticket) {
  selectedTicket.value = ticket;
  formData.title = ticket.title;
  formData.description = ticket.description;
  formData.status = ticket.status;
  showModal.value = true;
}

function handleUpdate() {
  if (!formData.title.trim() || !formData.description.trim()) {
    toast.error("Title and Description cannot be empty.");
    return;
  }

  tickets.value = tickets.value.map((ticket) =>
    ticket.id === selectedTicket.value.id
      ? { ...ticket, ...formData }
      : ticket
  );

  localStorage.setItem("tickets", JSON.stringify(tickets.value));
  toast.success("Ticket updated successfully!");
  showModal.value = false;
  selectedTicket.value = null;
}
</script>
