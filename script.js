function Book(author, title, pages, read) {
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
  content.textContent = obj.read ? 'Read' : 'Not read';
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
const container = document.querySelector('.container');
const form = document.querySelector('.dialog form');
const plus = document.querySelector('.container #plus');
const add = document.querySelector('.dialog #add');
const book1 = new Book('Abc', 'Game of thrones', 600, true);
const book2 = new Book('Xyz', 'Dune', 525, false);
const book3 = new Book(1, '2', 3, false);
const book4 = new Book('Abc', 'Game of thrones', 600, true);
const myLibrary = [book1, book2, book3, book4,
  // book1, book2, book3, book4,
  // book1
];

plus.addEventListener('click', () => {
  dialog.showModal();
})

add.addEventListener('click', e => {
  e.preventDefault();
  const title = form.title.value;
  const author = form.author.value;
  const pages = form.pages.value;
  const book = new Book(title, author, pages, false);
  prependBook(book);
  myLibrary.push(book);
  dialog.close();
})

container.addEventListener('click', e => {
  // HTMLElement.prototype.getAttribute('data-idx')
  if (e.target.classList.contains('delete')) {
    const book = e.target.parentElement;
    book.remove();
    const idx = +book.getAttribute('data-idx')
    myLibrary.splice(idx, 1);
    clearContainer();
    populateBooks();
  }
})

populateBooks();

// const cancel = document.querySelector('#cancel');

// cancel.addEventListener('click', (e) => {
//   e.preventDefault();
//   dialog.close();
// });
