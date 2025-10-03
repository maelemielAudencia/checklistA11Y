async function loadChecklist() {
    const response = await fetch('checklist.json');
    const data = await response.json();
    const container = document.getElementById('checklist-container');
    container.innerHTML = '';

    data.forEach(section => {
        const sectionDiv = document.createElement('section');
        sectionDiv.className = 'card';
        const h3 = document.createElement('h3');
        h3.textContent = section.section;
        sectionDiv.appendChild(h3);

        const sectionColor = section.color || '#005fcc';

        const ul = document.createElement('ul');
        ul.className = 'checklist';

        section.criteria.forEach(crit => {
            const li = document.createElement('li');
            li.className = 'item';
            let color = sectionColor;

            const label = document.createElement('label');
            label.className = 'checklist-checkbox my-4';
            label.style.setProperty('--checked-state-bg-color', color);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.setAttribute('data-key', crit.key);
            label.appendChild(checkbox);

            label.innerHTML += `<svg width="30" height="30" viewBox="-4 -4 39 39" fill="none" aria-hidden="true" focusable="false"><rect width="35" height="35" x="-2" y="-2" rx="10" stroke="currentColor" stroke-width="1" class="cb-bg"></rect><path d="M21.3334 11.381L12.4554 20.8809L8.21436 16.7684" fill="none" stroke="#FAFAFA" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" class="cb-cm"></path></svg>`;

            const spanContent = document.createElement('span');
            spanContent.className = 'checkbox-content';
            spanContent.innerHTML = `<span class="inline" style="--code-text-color: ${color}; --anchor-link-color: ${color};">${crit.label}</span>`;
            if (crit.hint) {
                spanContent.innerHTML += `<span class="hint">${crit.hint}</span>`;
            }
            // RGAA
            if (crit.rgaa && crit.rgaaUrl) {
                spanContent.innerHTML += `<a href="${crit.rgaaUrl}" target="_blank" class="inline-block font-normal font-lato rounded-md px-2 py-1 ml-2 bg-nc-orange-variant-1 text-nc-orange-variant-6" style="margin-top: -4px; text-decoration:none;">RGAA&nbsp;${crit.rgaa}</a>`;
            } else if (crit.rgaa) {
                spanContent.innerHTML += `<span class="inline-block font-normal font-lato rounded-md px-2 py-1 ml-2 bg-nc-orange-variant-1 text-nc-orange-variant-6" style="margin-top: -4px;">RGAA&nbsp;${crit.rgaa}</span>`;
            }
            // WCAG
            if (crit.wcag && crit.wcag.length) {
                crit.wcag.forEach(code => {
                    if (crit.wcagUrl && crit.wcagUrl[code]) {
                        spanContent.innerHTML += `<a href="${crit.wcagUrl[code]}" target="_blank" class="inline-block font-normal font-lato rounded-md px-2 py-1 ml-2 bg-nc-orange-variant-1 text-nc-orange-variant-6" style="margin-top: -4px; text-decoration:none;">WCAG&nbsp;${code}</a>`;
                    } else {
                        spanContent.innerHTML += `<span class="inline-block font-normal font-lato rounded-md px-2 py-1 ml-2 bg-nc-orange-variant-1 text-nc-orange-variant-6" style="margin-top: -4px;">WCAG&nbsp;${code}</span>`;
                    }
                });
            }
            label.appendChild(spanContent);
            li.appendChild(label);

            if (crit.tools && crit.tools.length) {
                const toolsDiv = document.createElement('div');
                toolsDiv.className = 'tools';
                toolsDiv.innerHTML = '<strong>Outils :</strong><br>' + crit.tools.map(t => `<a href="${t.url}" target="_blank">${t.name}</a>`).join('<br>');
                li.appendChild(toolsDiv);
            }
            ul.appendChild(li);
        });
        sectionDiv.appendChild(ul);
        container.appendChild(sectionDiv);
    });
}

document.addEventListener('DOMContentLoaded', loadChecklist);