<template>
  <section class="max-w-[1440px]">
    <header class="flex justify-around items-center p-2 mt-3 rounded-3xl shadow-md mx-auto bg-[#f6fafd]">
      <h2>
        Ticket<span class="font-bold text-purple-800">Solve</span>
      </h2>
      <div class="flex">
        <button
          class="px-6 py-2 bg-purple-500 text-white rounded-3xl text-sm font-bold"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </header>

    <div class="flex m-2">
      <aside class="rounded-sm p-2 w-2/5 md:w-1/5 lg:w-1/5 bg-purple-800 h-screen">
        <h2 class="p-4 font-bold text-2xl text-white">Ticket</h2>

        <nav>
          <ul class="flex flex-col p-4 gap-4 text-white font-bold">
            <li
              @click="activeTab = 'dashboard'"
              :class="tabClass('dashboard')"
            >
              Dashboard
            </li>
            <li
              @click="activeTab = 'tickets'"
              :class="tabClass('tickets')"
            >
              Create Ticket
            </li>
            <li
              @click="activeTab = 'my-tickets'"
              :class="tabClass('my-tickets')"
            >
              My Tickets
            </li>
            <li class="hover:bg-purple-500 hover:p-2">Profile</li>
          </ul>
        </nav>
      </aside>

      <main class="lg:p-4 lg:w-4/5 w-3/5 text-purple-500 font-bold shadow-md rounded-sm bg-white">
        <!-- Dashboard -->
        <template v-if="activeTab === 'dashboard'">
          <h5 class="text-center mt-2">Dashboard</h5>
          <h4 class="text-sm mt-4 p-6">Ticket Summary</h4>

          <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 p-6">
            <div class="summary-box bg-[#16A34A]">
              <h2 class="summary-header">TOTAL TICKETS</h2>
              <p class="text-4xl">{{ tickets.length }}</p>
            </div>
            <div class="summary-box bg-[#F59E0B]">
              <h2 class="summary-header">OPEN TICKETS</h2>
              <p class="text-4xl">{{ openCount }}</p>
            </div>
            <div class="summary-box bg-[#6B7280]">
              <h2 class="summary-header">RESOLVED TICKETS</h2>
              <p class="text-4xl">{{ closedCount }}</p>
            </div>
          </div>
        </template>

        <!-- Create Ticket -->
        <TicketPage
          v-if="activeTab === 'tickets'"
          :setActiveTab="setActiveTab"
        />

        <!-- My Tickets -->
        <MyTickets v-if="activeTab === 'my-tickets'" />
      </main>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import TicketPage from "./TicketPage.vue";
import MyTickets from "./MyTickets.vue";

const router = useRouter();
const toast = useToast();

const activeTab = ref("dashboard");
const tickets = ref(JSON.parse(localStorage.getItem("tickets")) || []);

const openCount = computed(
  () => tickets.value.filter((t) => t.status === "open").length
);
const closedCount = computed(
  () => tickets.value.filter((t) => t.status === "closed").length
);

const handleLogout = () => {
  if (window.confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
    router.push("/");
  }
};

const setActiveTab = (tab) => {
  activeTab.value = tab;
};

const tabClass = (tabName) => {
  return [
    "hover:bg-purple-500 hover:p-2 cursor-pointer",
    activeTab.value === tabName ? "bg-purple-600 p-2" : ""
  ];
};
</script>
