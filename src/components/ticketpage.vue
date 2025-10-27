<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="lg:text-3xl text-sm font-bold text-purple-800">
          Ticket Management Screen
        </h1>
      </div>

      <!-- Ticket Form -->
      <TicketForm :setActiveTab="setActiveTab" />
    </div>
  </div>
</template>

<script setup>
import TicketForm from "./ticketform.vue";

// Props
defineProps({
  setActiveTab: {
    type: Function,
    required: true,
  },
});
</script>
