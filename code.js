document.addEventListener('DOMContentLoaded', () => {
    fetchData(1);
});
let myChart;
async function fetchData(id) {
    try {
        const response = await fetch(`https://digi-api.com/api/v1/digimon/${id}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        let card = `<div class="card">
                <div class="img">
                    <img id="illustration" src="${data.images[0].href}"/>

                </div>
                <div id="info">
                    <p id="id">${data.id}</p>
                    <p id="name">${data.name}</p>
                </div>
                <div id="level">
                    <p><strong>Level:</strong> ${data.levels[0]?.level? data.levels[0].level : "none"}</p>
                </div>
            </div>`;
        const containers =  document.getElementById('container');
        containers.innerHTML = card;
        if (myChart) {
            myChart.destroy();
        }
        createChart(data);
        renderJSONAsHTML(data);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

function renderJSONAsHTML(json) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = parseObjectToHTML(json);
}

function createChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');

    const attributesCount = data.attributes.length;
    const typesCount = data.types.length;
    const fieldsCount = data.fields.length;

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Attributes', 'Types', 'Fields'],
            datasets: [{
                label: 'Count',
                data: [attributesCount, typesCount, fieldsCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            // indexAxis: 'y',
            scales: {
                // x: {
                //     beginAtZero: true
                // },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    document.getElementById('myChart').style.display = 'block';
}


function parseObjectToHTML(obj) {
    let html = '<ul>';
    for (let key in obj) {
        if (Array.isArray(obj[key])) {
            html += `<li><strong>${key}:</strong><ul>`;
            obj[key].forEach(item => {
                html += `<li>${parseObjectToHTML(item)}</li>`;
            });
            html += '</ul></li>';
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            html += `<li><strong>${key}:</strong> ${parseObjectToHTML(obj[key])}</li>`;
        } else {
            html += `<li><strong>${key}:</strong> ${obj[key]}</li>`;
        }
    }
    html += '</ul>';
    return html;
}
