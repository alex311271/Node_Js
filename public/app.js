document.addEventListener('click', event => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id
		remove(id).then(() => {
			event.target.closest('li').remove()
		})
	}
})

document.addEventListener('click', event => {
	if (event.target.dataset.type === 'edit') {
		const id = event.target.dataset.id

		const text = document.getElementById(id)

		const note = prompt('Enter new name', text.textContent.trim())

		put(note, id).then(() => {
			text.innerHTML = note
		})
	}
})

async function remove(id) {
	await fetch(`/${id}`, { method: 'DELETE' })
}

async function put(data, id) {
	await fetch(`/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			id: id,
			title: data,
		}),
	})
}
