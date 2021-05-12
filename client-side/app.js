const form = document.querySelector('form')
const wrapper = document.querySelector('#wrapper')

const blogs = (datas) => {
  for (data of datas) {
    const title = data.title
    const author = data.author
    const body = data.body
    const mainDiv = document.createElement('div')
    const subDiv = document.createElement('div')
    const spanDiv = document.createElement('div')
    const h2 = document.createElement('h2')
    const h5 = document.createElement('h5')
    const p = document.createElement('p')

    mainDiv.classList.add('col-md-6', 'mb-5')
    subDiv.classList.add('h-100', 'p-5', 'text-dark', 'bg-light', 'rounded-3')

    for (let tag of data.tags) {
      const span = document.createElement('span')
      span.innerHTML = `<span class="badge bg-dark text-light">#${tag} </span>`
      spanDiv.append(span)
    }

    h2.innerHTML = `${title}<hr>`
    h5.innerHTML = `Szerző: ${author}`
    p.textContent = body

    subDiv.append(h2, h5, p, spanDiv)
    mainDiv.append(subDiv)
    wrapper.append(mainDiv)
  }
}

const searchBlog = async () => {
  try {
    const search = form.elements.search.value
    if (search === null) {
      return
    } else {
      const res = await fetch(
        `http://localhost:3000/api/posts?keyword=${search}`
      )
      const datas = await res.json()
      blogs(datas)
    }
  } catch (err) {
    console.log('SOMETHING WENT WRONG!')
  }
}

form.addEventListener('submit', (e) => {
  document.querySelector('#wrapper').innerHTML = ''
  e.preventDefault()
  searchBlog()
  form.elements.search.value = ''
})
