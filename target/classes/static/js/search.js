const tags = document.querySelectorAll('.tag');
const selectedTagsBox = document.getElementById('selectedTags');
const clearAllBtn = document.getElementById('clearAll');

// 태그 클릭
tags.forEach(tag => {
  tag.addEventListener('click', () => {
    const section = tag.closest('.category-section');
    const isSingle = section.dataset.single === "true";

    if (isSingle) {
      section.querySelectorAll('.tag.active').forEach(t => t.classList.remove('active'));
    }

    tag.classList.toggle('active');
    updateSelectedTags();
  });
});

function updateSelectedTags() {
  selectedTagsBox.innerHTML = "";

  const activeTags = document.querySelectorAll('.tag.active');
  activeTags.forEach(tag => {
    const clone = tag.cloneNode(true);
    clone.classList.remove('active');
    clone.classList.add('summary');

    const removeBtn = document.createElement('span');
    removeBtn.textContent = '×';
    removeBtn.className = 'remove';

    removeBtn.addEventListener('click', () => {
      tag.classList.remove('active');
      updateSelectedTags();
    });

    clone.appendChild(removeBtn);
    selectedTagsBox.appendChild(clone);
  });
}

clearAllBtn.addEventListener('click', () => {
  document.querySelectorAll('.tag.active').forEach(tag => tag.classList.remove('active'));
  updateSelectedTags();
});

document.querySelector(".search-button").addEventListener("click", function () {
  window.location.href = "/mappage";
});

document.querySelectorAll('[data-scroll]').forEach(button => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.scroll);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
