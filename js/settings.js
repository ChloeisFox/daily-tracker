const app = window.dailyTracker;

async function init() {
  await app.ensureApp();
  app.requireProfile();
  const profile = app.getCurrentProfile();
  const liveProfile = (await app.db.list('profiles', { id: profile.id }))[0] || profile;

  document.getElementById('currentProfileCard').innerHTML = `
    <div class="summary-row"><span>Name</span><strong>${liveProfile.name}</strong></div>
    <div class="summary-row"><span>PIN</span><strong>••••</strong></div>
    <div class="summary-row"><span>Theme</span><strong>${localStorage.getItem('preferredTheme') || 'light'}</strong></div>
  `;

  document.getElementById('startWeight').value = liveProfile?.goals?.startWeight || '';
  document.getElementById('goalWeight').value = liveProfile?.goals?.goalWeight || '';
  document.getElementById('calorieTarget').value = liveProfile?.goals?.calorieTarget || '';
  document.getElementById('proteinTarget').value = liveProfile?.goals?.proteinTarget || '';
  document.getElementById('weighInDays').value = liveProfile?.goals?.weighInDays || 5;
  document.getElementById('displayName').value = liveProfile.name || '';

  document.getElementById('settingsForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const updated = {
      ...liveProfile,
      name: document.getElementById('displayName').value.trim() || liveProfile.name,
      theme: document.body.classList.contains('theme-dark') ? 'dark' : 'light',
      goals: {
        startWeight: document.getElementById('startWeight').value,
        goalWeight: document.getElementById('goalWeight').value,
        calorieTarget: Number(document.getElementById('calorieTarget').value || 0),
        proteinTarget: Number(document.getElementById('proteinTarget').value || 0),
        weighInDays: Number(document.getElementById('weighInDays').value || 5)
      }
    };
    await app.db.upsert('profiles', liveProfile.id, updated);
    app.setCurrentProfile(updated);
    alert('Settings saved.');
  });

  document.getElementById('profileForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('newProfileName').value.trim();
    const pin = document.getElementById('newProfilePin').value.trim();
    if (!name || pin.length !== 4) {
      alert('Please enter a name and a 4-digit PIN.');
      return;
    }
    await app.db.create('profiles', {
      id: app.helpers.slugify(name),
      name,
      pin,
      createdAt: new Date().toISOString(),
      theme: document.body.classList.contains('theme-dark') ? 'dark' : 'light',
      goals: { startWeight: '', goalWeight: '', calorieTarget: 1800, proteinTarget: 100, weighInDays: 5 }
    });
    event.target.reset();
    alert('Profile created. You can switch to it from the profile picker.');
  });

  document.getElementById('enableNotifications').addEventListener('click', async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications.');
      return;
    }
    const result = await Notification.requestPermission();
    alert(result === 'granted' ? 'Notifications enabled.' : 'Notifications were not enabled.');
  });
}

init();
