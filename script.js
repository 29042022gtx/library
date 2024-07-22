function Book(title, author, pages, read) {
  this.title = title + '';
  this.author = author + '';
  this.pages = +pages;
  this.read = read;
}

function clearContainer() {
  for (let i = container.childNodes.length - 3; i > 1; i--)
    container.removeChild(container.firstChild);
}

function populateBooks() {
  // myLibrary.sort((a, b) => {
  //   let s1 = a.title;
  //   let s2 = b.title;
  //   return s1.localeCompare(s2, undefined, {sensitivity: 'accent'});
  // })
  let idx = 0;
  myLibrary.forEach(obj => {
    prependBook(obj, idx++);
  })
}

function prependBook(obj, idx) {
  const div = newDiv();
  div.setAttribute('data-idx', idx);
  let content = newDiv('title');
  content.textContent = obj.title;
  div.appendChild(content);

  content = newDiv('author');
  content.textContent = obj.author;
  div.appendChild(content);

  content = newDiv('pages');
  content.textContent = obj.pages + ' pages';
  div.appendChild(content);

  content = newDiv('read');
  const check = document.createElement('input');
  check.type = 'checkbox';
  check.classList.add('read-check');
  check.name = 'read';
  check.checked = obj.read;
  content.appendChild(check);

  const readStatus = newDiv('read-status');
  readStatus.textContent = obj.read ? 'Read' : 'Not read';
  content.appendChild(readStatus);
  div.appendChild(content);

  content = newDiv('delete');
  content.textContent = 'x';
  div.appendChild(content);

  container.prepend(div);
}

function newDiv(className) {
  const element = document.createElement('div');
  if (className != null)
    element.classList.add(className);
  return element;
}

const dialog = document.querySelector('dialog');
const form = document.querySelector('.dialog form');
const add = document.querySelector('.dialog #add');
const container = document.querySelector('.container');
const plus = document.querySelector('.container #plus');
const book1 = new Book('Demo', 'Owen', 600, true);
const myLibrary = [book1];

plus.addEventListener('click', () => {
  dialog.showModal();
})

add.addEventListener('click', e => {
  e.preventDefault();
  const title = form.title.value;
  const author = form.author.value;
  const pages = form.pages.value;
  const book = new Book(title, author, pages, false);
  prependBook(book, myLibrary.length);
  myLibrary.push(book);
  dialog.close();
  form.reset();
})

container.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    const book = e.target.parentElement;
    book.remove();
    const idx = +book.getAttribute('data-idx')
    myLibrary.splice(idx, 1);
    clearContainer();
    populateBooks();
    return;
  }
  if (e.target.classList.contains('read-check')) {
    const book = e.target.parentElement.parentElement;
    const idx = +book.getAttribute('data-idx')
    const read = !myLibrary[idx].read;
    myLibrary[idx].read = read;
    let content;
    if (read) {
      content = 'Read'
    } else {
      content = 'Not read'
    }
    const s = book.querySelector('.read-status').textContent
    console.log(s);
    book.querySelector('.read-status').textContent = content;
  }
})

populateBooks();
