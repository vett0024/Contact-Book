
const STORAGE_KEY = 'contact-book-contacts'

const sampleContacts = [
  { id: '1', firstName: 'Alice', lastName: 'Anderson', email: 'alice@example.com', phone: '555-0101', address: '12 Maple St', notes: 'Old friend from college' },
  { id: '2', firstName: 'Bob', lastName: 'Barnes', email: 'bob@example.com', phone: '555-0102', address: '34 Oak Ave', notes: '' },
  { id: '3', firstName: 'Clara', lastName: 'Chen', email: 'clara.chen@example.com', phone: '555-0103', address: '56 Pine Rd', notes: 'Prefers email contact' },
  { id: '4', firstName: 'David', lastName: 'Diaz', email: 'david@example.com', phone: '555-0104', address: '78 Elm Blvd', notes: '' },
  { id: '5', firstName: 'Eva', lastName: 'Evans', email: 'eva@example.com', phone: '555-0105', address: '90 Cedar Ln', notes: 'Birthday: March 12' },
]

export const loadContacts = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleContacts))
  return sampleContacts
}


export const loadContact = (id) => {
  const contacts = loadContacts()
  return contacts.find(c => c.id === id) || null
}


export const saveContacts = (contacts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
}


export const addContact = (data) => {
  const contacts = loadContacts()
  const newContact = { ...data, id: Date.now().toString() }
  contacts.push(newContact)
  saveContacts(contacts)
  return newContact
}


export const updateContact = (id, data) => {
  const contacts = loadContacts()
  const index = contacts.findIndex(c => c.id === id)
  if (index === -1) return null
  contacts[index] = { ...contacts[index], ...data }
  saveContacts(contacts)
  return contacts[index]
}


export const deleteContact = (id) => {
  const contacts = loadContacts()
  const filtered = contacts.filter(c => c.id !== id)
  saveContacts(filtered)
}
