<template>
  <div>
    <h1>My Contacts</h1>
    <p>{{ contacts.length }} contact(s) saved</p>

    <br />

    <div class="search-bar">
      <label for="search">Search:</label>
      <input
        id="search"
        v-model="searchQuery"
        type="text"
        placeholder="Type a first or last name..."
        style="width: 250px; margin-left: 8px;"
      />
      <button v-if="searchQuery" @click="searchQuery = ''" style="margin-left: 6px;">Clear</button>
    </div>

    <br />

    <div v-if="filteredContacts.length === 0">
      <p v-if="searchQuery">No contacts found for "{{ searchQuery }}".</p>
      <p v-else>No contacts yet. <router-link to="/new">Add one!</router-link></p>
    </div>

    <div v-else>
      <template v-for="(group, letter) in groupedContacts" :key="letter">
        <h2 class="letter-heading">{{ letter }}</h2>
        <ul class="contact-list">
          <li v-for="contact in group" :key="contact.id" class="contact-item">
            <router-link :to="'/contact/' + contact.id">
              {{ contact.lastName }}, {{ contact.firstName }}
            </router-link>
            <span class="contact-email"> — {{ contact.email }}</span>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import { loadContacts } from '../utils/storage.js'

export default {
  name: 'HomeView',

  data() {
    return {
      contacts: [],
      searchQuery: '',
    }
  },

  computed: {
    filteredContacts() {
      const q = this.searchQuery.toLowerCase().trim()
      return [...this.contacts]
        .filter(c => {
          if (!q) return true
          return (
            c.firstName.toLowerCase().includes(q) ||
            c.lastName.toLowerCase().includes(q)
          )
        })
        .sort((a, b) => {
          const byLast = a.lastName.localeCompare(b.lastName)
          return byLast !== 0 ? byLast : a.firstName.localeCompare(b.firstName)
        })
    },

    groupedContacts() {
      const groups = {}
      for (const contact of this.filteredContacts) {
        const letter = contact.lastName[0].toUpperCase()
        if (!groups[letter]) groups[letter] = []
        groups[letter].push(contact)
      }
      return groups
    },
  },

  methods: {
    refreshContacts() {
      this.contacts = loadContacts()
    },
  },

  created() {
    this.refreshContacts()
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.refreshContacts())
  },
}
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 4px;
}

.search-bar {
  display: flex;
  align-items: center;
}

.letter-heading {
  font-size: 18px;
  color: #003399;
  border-bottom: 1px solid #ccc;
  margin-top: 20px;
  margin-bottom: 6px;
  padding-bottom: 4px;
}

.contact-list {
  list-style: none;
  padding: 0;
}

.contact-item {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  font-size: 15px;
}

.contact-email {
  color: #666;
  font-size: 13px;
}
</style>
