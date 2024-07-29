/** @format */

import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Search from './components/Search'
import ShowPersons from './components/ShowPersons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterResult, setFilterResult] = useState('')

    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        personService.getAll().then((allPersons) => {
            setPersons(allPersons)
        })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber,
        }

        if (!persons.find((person) => person.name === personObject.name)) {
            personService
                .create(personObject)
                .then((newPerson) => {
                    setPersons(persons.concat(newPerson))
                    setNewName('')
                    setNewNumber('')
                })
                .then(() => {
                    setSuccessMsg(`Added person ${personObject.name}`)
                    setTimeout(() => {
                        setSuccessMsg(null)
                    }, 2500)
                })
                .catch((e) => {
                    setErrorMsg(
                        `Error while adding person of ${personObject.name}`
                    )
                    setTimeout(() => {
                        setErrorMsg(null)
                    }, 2500)
                })
        } else {
            const confirmation = confirm(
                personObject.name +
                    ' is already added to the phonebook,' +
                    ' replace the old number with a new one?'
            )

            if (confirmation) {
                personService
                    .updateOne(
                        persons.find(
                            (person) => person.name === personObject.name
                        ).id,
                        personObject
                    )
                    .then((newPerson) => {
                        setPersons(
                            persons.map((person) => {
                                return person.name === newPerson.name
                                    ? { ...person, number: newPerson.number }
                                    : person
                            })
                        )

                        setNewName('')
                        setNewNumber('')
                    })
                    .then(() => {
                        setSuccessMsg(`Changed number of ${personObject.name}`)
                        setTimeout(() => {
                            setSuccessMsg(null)
                        }, 2500)
                    })
                    .catch((e) => {
                        setErrorMsg(
                            `Error while changing number of ${personObject.name}`
                        )
                        setTimeout(() => {
                            setErrorMsg(null)
                        }, 2500)
                    })
            }
        }
    }

    const removePerson = (id) => {
        personService
            .deleteOne(id)
            .then((removedPerson) => {
                setPersons(
                    persons.filter(
                        (person) => person.name !== removedPerson.name
                    )
                )
            })
            .then(() => {
                setSuccessMsg(`Removed person`)
                setTimeout(() => {
                    setSuccessMsg(null)
                }, 2500)
            })
            .catch((e) => {
                setErrorMsg(`Error ${e.response.status} while removing person`)
                setTimeout(() => {
                    setErrorMsg(null)
                }, 2500)
            })
    }

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterResultChange = (event) => {
        setFilterResult(event.target.value)
    }

    const personsShow =
        filterResult === ''
            ? persons
            : persons.filter((elem) => elem.name.includes(filterResult))
    return (
        <div>
            <h2>Phonebook </h2>

            <Notification message={successMsg} msgType={'success'} />
            <Notification message={errorMsg} msgType={'error'} />

            <Search value={filterResult} onChange={handleFilterResultChange} />

            <h2>Add a new Person</h2>

            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNewNameChange={handleNewNameChange}
                newNumber={newNumber}
                handleNewNumberChange={handleNewNumberChange}
            />

            <h2>Numbers</h2>

            <ShowPersons
                personsShow={personsShow}
                onRemovePerson={removePerson}
            />
        </div>
    )
}

export default App
