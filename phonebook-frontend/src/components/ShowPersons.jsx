/** @format */

import personService from '../services/persons'

const Person = ({ person, onRemovePerson }) => {
    return (
        <div>
            {person.name} {person.number}{' '}
            <button onClick={() => onRemovePerson(person.id)}>delete</button>
        </div>
    )
}

const ShowPersons = ({ personsShow, onRemovePerson }) => {
    return (
        <>
            {personsShow.map((person) => (
                <Person
                    key={person.id}
                    person={person}
                    onRemovePerson={onRemovePerson}
                />
            ))}
        </>
    )
}

export default ShowPersons
