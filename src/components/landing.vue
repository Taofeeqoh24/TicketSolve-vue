<template>
  <div class="landing">
    <!-- Header -->
    <header class="flex items-center justify-around p-5 shadow-md mx-auto bg-[#f6fafd]">
      <h1 class="text-xl">
        Ticket<span class="font-bold text-purple-800">Solve</span>
      </h1>

      <nav class="hidden md:block lg:block">
        <ul class="flex gap-4">
          <li>Product</li>
          <li>Features</li>
          <li>Pricing</li>
          <li>Company</li>
        </ul>
      </nav>

      <div class="gap-2 flex">
        <button
          class="px-6 py-2 bg-purple-500 text-white rounded-3xl text-sm font-bold"
          @click="goTo('/login')"
        >
          Login
        </button>
        <button
          class="px-4 py-2 text-purple-500 rounded-3xl text-sm font-bold border"
          @click="goTo('/register')"
        >
          Get Started
        </button>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="main h-96 font-bold flex flex-col items-center justify-center text-center">
      <svg class="decorative-svg" width="200" height="200" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="150" fill="url(#grad)" opacity="0.4" />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="50%" stop-color="#a855f7" />
            <stop offset="100%" stop-color="#ec4899" />
          </linearGradient>
        </defs>
      </svg>

      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
        Simplify Your Workflow with Ticket<span class="font-bold text-purple-800">Solve</span>
      </h2>

      <p class="text-sm md:text-lg lg:text-lg mb-6 px-4 max-w-xl">
        Keep your team in sync. Prioritize, assign, and close tickets
        without the stress. Handle every ticket like a pro — fast,
        transparent, and built for growing teams.
      </p>

      <button
        class="bg-purple-500 hover:animate-bounce font-semibold text-white px-6 py-3 rounded-md"
        @click="goTo('/register')"
      >
        Get Started for Free
      </button>
    </main>

    <!-- Features Section -->
    <section class="flex flex-col items-center justify-center p-10 bg-[#f6fafd] gap-10">
      <span class="mt-4">
        <h1 class="font-bold text-3xl">Built for Speed and Simplicity.</h1>
        <p class="mt-2 text-center">From open to resolved — everything just flows.</p>
      </span>

      <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        <div class="features-box" v-for="(item, index) in features" :key="index">
          <h2 class="features-header">{{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="flex items-center justify-center p-4 rounded-md shadow-md mx-auto text-white bg-gray-700 font-bold"
    >
      <aside class="text-center text-sm">
        <p>Copyright &copy; Taofeeqoh 2025 - All Rights Reserved</p>
        <p>Designed for HNG 13 - Stage 2 Task</p>
      </aside>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goTo = (path) => {
  router.push(path)
}

const features = [
  {
    title: 'SMART',
    description:
      'Monitor every issue from start to finish with real-time updates and intuitive dashboards.'
  },
  {
    title: 'Analytics',
    description:
      'Turn your data into decisions with visual reports that track performance, response time, and resolution rates.'
  },
  {
    title: 'Collaboration',
    description:
      'Assign, comment, and resolve tickets effortlessly as a team — no message lost, no task forgotten.'
  },
  {
    title: 'Automation',
    description:
      'Handle repetitive actions easily — focus on problem-solving, not paperwork.'
  },
  {
    title: 'Customization',
    description:
      'Customize your ticket to be resolved easily.'
  },
  {
    title: 'Speed',
    description:
      'Solving tickets faster with our optimized workflow processes.'
  }
]
</script>
