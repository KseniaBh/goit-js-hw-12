export default function createMarkup(array) {
    return array
            .map(
              ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads,
              }) => {
                return `<li class="item">
          <a href="${largeImageURL}"><img class="image" src="${webformatURL}" alt="${tags}" /></a>
          <ul class="item-list">
            <li class="item-list-item">
              <h3 class="title">Likes</h3>
              <p class="value">${likes}</p>
            </li>
            <li class="item-list-item">
              <h3 class="title">Views</h3>
              <p class="value">${views}</p>
            </li>
            <li class="item-list-item">
              <h3 class="title">Comments</h3>
              <p class="value">${comments}</p>
            </li>
            <li class="item-list-item">
              <h3 class="title">Downloads</h3>
              <p class="value">${downloads}</p>
            </li>
          </ul>
        </li>`;
              }
            )
            .join('');
}