const searchInput = document.getElementById('search');
const reposes = document.getElementById('reposes');
const repoList = document.getElementById('repo-list');

let timeout = null;

searchInput.addEventListener('input', () => {
  clearTimeout(timeout);
  const query = searchInput.value.trim();

  if (query === '') {
    reposes.innerHTML = '';
    return;
  }

  timeout = setTimeout(() => {
    fetchRepos(query);
  }, 500);
});

async function fetchRepos(query) {
  try {
    const res = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=5`);
    const data = await res.json();
    showReposes(data.items);
  } catch (err) {
    console.error('Ошибка при получении данных:', err);
  }
}

function showReposes(repos) {
  reposes.innerHTML = '';
  if (!repos) return;
  
  repos.forEach(repo => {
    const li = document.createElement('li');
    li.textContent = repo.name;
    li.addEventListener('click', () => {
      addRepo(repo);
      reposes.innerHTML = '';
      searchInput.value = '';
    });
    reposes.appendChild(li);
  });
}

function addRepo(repo) {
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${repo.name}</strong><br />
    Владелец: ${repo.owner.login}<br />
    ⭐ Звёзды: ${repo.stargazers_count}
    <button class="remove-btn">Удалить</button>
  `;

  li.querySelector('.remove-btn').addEventListener('click', () => {
    li.remove();
  });

  repoList.appendChild(li);
}