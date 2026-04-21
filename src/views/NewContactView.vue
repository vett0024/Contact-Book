<template>
  <div>
    <p><router-link to="/">&larr; Back to contacts</router-link></p>
    <br />
    <h1>Add New Contact</h1>
    <br />
    <ContactForm
      submit-label="Add Contact"
      cancel-to="/"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import ContactForm from '../components/ContactForm.vue'
import { addContact } from '../utils/storage.js'

export default {
  name: 'NewContactView',
  components: { ContactForm },

  methods: {
    handleSubmit(formData) {
      const newContact = addContact(formData)
      this.$router.push('/contact/' + newContact.id)
    },
  },
}
</script>

<style scoped>
h1 { font-size: 22px; }
</style>
