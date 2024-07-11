function Book(author, title, pages, read) {
  this.title = title + '';
  this.author = author + '';
  this.pages = +pages;
  this.read = read;
}

function populateBooks() {
  // myLibrary.sort((a, b) => {
  //   let s1 = a.title;
  //   let s2 = b.title;
  //   return s1.localeCompare(s2, undefined, {sensitivity: 'accent'});
  // })
  
  myLibrary.forEach(obj => {
    const div = newDiv();

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

    container.prepend(div);
  })
}

function pushContent() {

}

function newDiv(className) {
  const element = document.createElement('div');
  if (className != null)
    element.classList.add(className);
  return element;
}

const container = document.querySelector('.container');
const book1 = new Book('Abc', 'Game of thrones', 600, true);
const book2 = new Book('Xyz', 'Dune', 525, false);
const book3 = new Book(1, '2', 3, false);
const book4 = new Book('Abc', 'Game of thrones', 600, true);
const myLibrary = [book1, book2, book3, book4,
  book1, book2, book3, book4,
  book1, book2
];

populateBooks();
