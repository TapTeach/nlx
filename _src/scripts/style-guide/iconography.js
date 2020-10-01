document.addEventListener('DOMContentLoaded', () => {
  function iterateJson() {
    const hr = new XMLHttpRequest();
    const eleIconlist = document.getElementById('iconography-list');

    hr.open('GET', '../assets/icons/metadata.json', true);
    hr.setRequestHeader('Content-type', 'application/json', true);

    if (eleIconlist) {
      hr.onreadystatechange = () => {
        if (hr.readyState === 4 && hr.status === 200) {
          const data = JSON.parse(hr.responseText);

          for (let i = 0; i < data.length; i += 1) {
            const obj = data[i];
            eleIconlist.innerHTML += `
            <div class="col-12 md:col-4 lg:col-3 mb-2">
              <div class="row items-center">
                <div class="col-variable">
                  <div class="iconography">
                    <svg viewBox="${obj.viewBox}" class="iconography-svg" size="md" color="currentColor">
                      <use xlink:href="../../assets/icons/icons.svg#${obj.name}"></use>
                    </svg>
                  </div>
                </div>
              <div class="col-variable"><code>${obj.name}</code></div>
            </div>`;
          }
        }
      };
    }

    hr.send(null);
  }

  iterateJson();
});
