const bookList = bookData.map(b => Object.assign(b, {comments: []}));
const favoritedBooks = [];

const bookshelf = document.querySelector('.bookshelf');

//// add books ///
const addBookButton = document.querySelector('.add-button');
const newTitle = document.querySelector('.input-title');
const newAuthor = document.querySelector('.input-author');
const newSubjects = document.querySelector('.input-subjects');
const newLanguage = document.querySelector('.input-language');

addBookButton.addEventListener('click', () => {
    const newBook = {};
    newBook.title = newTitle.value;
    newBook.author = newAuthor.value;
    newBook.subject = newSubjects.value;
    newBook.language = newLanguage.value;
    newBook.comments = [];
    console.log(bookList);
    bookList.unshift(newBook);
    renderAllBooks(bookList);
})

//// favorites section ///
const favSection = document.querySelector('.favorites');
const favCount = document.createElement('article');
favCount.classList.add('favcounter');
favCount.textContent = 'You have 0 favorited books.';

const favCountButton = document.createElement('button');
favCountButton.textContent = 'Update count';
favCountButton.classList.add('favcounter-button');

favSection.append(favCount, favCountButton);

favCountButton.addEventListener('click', ()=> {
    favCount.textContent = `You have ` + favoritedBooks.length + ` ❤️ book(s).`;})
//////////

//// search bar ////
const searchInput = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-icon');

searchButton.addEventListener('click', ()=>{
    const searched = searchInput.value.toLowerCase();
    const result = bookList.filter(book => book.title.toString().toLowerCase().includes(searched) || book.author.toString().toLowerCase().includes(searched) || book.subject.toString().toLowerCase().includes(searched));

    renderAllBooks(result);
})
//////

////sort dropdown/////
const dropdown = document.querySelector(".dropdown");
dropdown.addEventListener('change', (event) => {
    if (event.target.value === "title-descending") {
        bookList.sort((a, b) => a.title.localeCompare(b.title));} 

    if (event.target.value === "author-descending") {
        bookList.sort((c, d) => c.author[0].localeCompare(d.author[0]));}

    if (event.target.value === "topicsnumber") {
        bookList.sort((e, f) => f.subject.length - e.subject.length);}
        
        renderAllBooks(bookList);
})
//////

/// main book function
const makeBook = (book) => {
    const bookCard = document.createElement('section');
    bookCard.classList.add('card');

    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('booktitle');
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement('h4');
    bookAuthor.classList.add('bookauthor');
    bookAuthor.textContent = book.author;

    const bookSubjects = document.createElement('p');
    bookSubjects.classList.add('booksubjects');
    bookSubjects.textContent = 'Subjects: ' + book.subject;

    const bookLanguage = document.createElement('p');
    bookLanguage.classList.add('booklanguage');
    bookLanguage.textContent = 'Language: ' + book.language.toUpperCase();

    bookCard.append(bookTitle, bookAuthor, bookSubjects, bookLanguage);

    const favMessage = (book) => {
        if (favoritedBooks.includes(book)) {return '❤️'}
        else {return '♡'}
    }

    const favoriteButton = document.createElement('button');
    favoriteButton.classList.add('fav-button');
    favoriteButton.textContent = favMessage(book);


    favoriteButton.addEventListener('click', () => {
        favoritedBooks.push(book);
        favoriteButton.textContent = ('❤️')
    })
 
    bookCard.prepend(favoriteButton);

    const addComment = document.createElement('button');
    addComment.textContent = ('Add a Comment');
    addComment.classList.add('addcomment-button');

    const commentSection = document.createElement('section');
    commentSection.classList.add('comment-section');

    const commentHeader = document.createElement('p');
    commentHeader.classList.add('comment-header');
    commentHeader.textContent = ('Comments on "' + book.title + '"');

    const previousComments = document.createElement('ul');
    previousComments.classList.add('previous-comments');
    previousComments.textContent = book.comments;

    commentSection.append(commentHeader, previousComments);

    bookCard.append(addComment, commentSection);

    addComment.addEventListener('click', () => {
        const commentBox = document.createElement('input');
        commentBox.classList.add('commentbox');
        commentBox.setAttribute('placeholder', 'Add a Comment (280 character limit)');
        commentBox.setAttribute('maxlength', '280');
        const submitComment = document.createElement('button');
        submitComment.classList.add('submitcomment-button');
        submitComment.textContent = ('Send');

        addComment.replaceWith(commentBox, submitComment);
        
        submitComment.addEventListener('click', ()=> {
            const commentListElement = document.createElement('li');
            commentListElement.classList.add('comm-list-element');
            commentListElement.textContent = commentBox.value;
            book.comments.push(commentBox.value);
            previousComments.append(commentListElement);

            commentBox.style.opacity = '0.6';
            commentBox.setAttribute('placeholder', 'Sent');
        })
    })
    return bookCard;
}
////////

const renderAllBooks = (books) => {
    const newElements = books.map(makeBook);
    bookshelf.replaceChildren(...newElements);
}

renderAllBooks(bookList);