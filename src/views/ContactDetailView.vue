<template>
  <div>
    <p><router-link to="/">&larr; Back to contacts</router-link></p>
    <br />

    <div v-if="!contact">
      <p>Contact not found.</p>
    </div>

    <div v-else>
      <h1>{{ contact.firstName }} {{ contact.lastName }}</h1>
      <br />

      <table class="detail-table">
        <tbody>
          <tr v-if="contact.email">
            <td class="label">Email:</td>
            <td><a :href="'mailto:' + contact.email">{{ contact.email }}</a></td>
          </tr>
          <tr v-if="contact.phone">
            <td class="label">Phone:</td>
            <td>{{ contact.phone }}</td>
          </tr>
          <tr v-if="contact.address">
            <td class="label">Address:</td>
            <td>{{ contact.address }}</td>
          </tr>
          <tr v-if="contact.notes">
            <td class="label">Notes:</td>
            <td>{{ contact.notes }}</td>
          </tr>
        </tbody>
      </table>

      <br />

      <router-link :to="'/edit/' + contact.id" class="btn-edit">Edit</router-link>
      &nbsp;
      <button class="btn-delete" @click="showConfirm = true">Delete</button>

      <!-- Confirmation box -->
      <div v-if="showConfirm" class="confirm-box">
        <p>Are you sure you want to delete <strong>{{ contact.firstName }} {{ contact.lastName }}</strong>?</p>
        <button class="btn-delete" @click="handleDelete">Yes, Delete</button>
        &nbsp;
        <button @click="showConfirm = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { loadContact, deleteContact } from '../utils/storage.js'

export default {
  name: 'ContactDetailView',

  data() {
    return {
      contact: null,
      showConfirm: false,
    }
  },

  methods: {
    handleDelete() {
      deleteContact(this.$route.params.id)
      this.$router.push('/')
    },
  },

  created() {
    this.contact = loadContact(this.$route.params.id)
  },
}
</script>

<style scoped>
h1 {
  font-size: 22px;
}

.detail-table {
  border-collapse: collapse;
  width: 100%;
  max-width: 500px;
}

.detail-table td {
  padding: 8px 10px;
  border: 1px solid #ccc;
  font-size: 15px;
}

.label {
  font-weight: bold;
  background-color: #f0f0f0;
  width: 100px;
}

.btn-edit {
  background-color: #003399;
  color: #fff;
  padding: 6px 14px;
  border-radius: 3px;
  text-decoration: none;
  font-size: 14px;
}

.btn-edit:hover {
  background-color: #0044bb;
  color: #fff;
}

.btn-delete {
  background-color: #cc0000;
  color: #fff;
  padding: 6px 14px;
  border-radius: 3px;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #aa0000;
}

.confirm-box {
  margin-top: 16px;
  padding: 12px;
  border: 1px solid #cc0000;
  background-color: #fff5f5;
  border-radius: 4px;
  max-width: 400px;
}

.confirm-box p {
  margin-bottom: 10px;
}
</style>
