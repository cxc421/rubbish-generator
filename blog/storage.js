const countDOM = document.querySelector('.count');
const addBtn = document.querySelector('.add-btn');

chrome.storage.sync.get('count', data => {
  let value = data.count || 0;
  countDOM.textContent = value;

  addBtn.addEventListener('click', () => {
    chrome.storage.sync.set({ count: value + 1 }, function() {});
  });

  chrome.storage.onChanged.addListener(changes => {
    if (changes.hasOwnProperty('count')) {
      value = changes.count.newValue;
      countDOM.textContent = value;
    }
  });
});
