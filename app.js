document.addEventListener('DOMContentLoaded', () => {
    // The API URL to fetch the JSON data
    const apiUrl = 'https://comp.pre.uefa.com/v2/round-participants?competitionId=1&seasonYear=2025';

    fetch(apiUrl)
.then(response => response.json())
        .then(data => {
            // Group data by phase
            const groupedByPhase = data.reduce((acc, item) => {
                const phase = item.round.phase;
                if (!acc[phase]) {
                    acc[phase] = [];
                }
                acc[phase].push(item);
                return acc;
            }, {});

            const container = document.querySelector('#round-details-container');

            // Create a table for each phase
            Object.keys(groupedByPhase).forEach(phase => {
                const table = document.createElement('table');
                table.classList.add('round-details-table');

                // Create table header
                const thead = document.createElement('thead');
                thead.innerHTML = `
                    <tr>
                        <th>Round Name</th>

                        <th>Status</th>
                        <th>Team Count</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Teams</th>
                    </tr>
                `;
                table.appendChild(thead);

                const tbody = document.createElement('tbody');

                // Populate table rows with data for this phase
                groupedByPhase[phase].forEach(item => {
                    const round = item.round;

                    const roundName = round.metaData.name;
                    const competitionId = round.competitionId;
                    const seasonYear = round.seasonYear;
                    const status = round.status;
                    const teamCount = round.teamCount;
                    const dateFrom = new Date(round.dateFrom).toLocaleDateString();
                    const dateTo = new Date(round.dateTo).toLocaleDateString();

                    const teams = round.teams.map(team => `<div>${team}</div>`).join('');

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td style="max-width: 150px;">${roundName}</td>
                        <td>${status}</td>
                        <td>${teamCount}</td>
                        <td>${dateFrom}</td>
                        <td>${dateTo}</td>
                        <td class="teams">${teams}</td>
                    `;
                    tbody.appendChild(row);
                });

                table.appendChild(tbody);

                // Add a header for each phase
                const phaseHeader = document.createElement('h2');
                phaseHeader.textContent = `Phase: ${phase}`;
                container.appendChild(phaseHeader);

                // Append the table for this phase to the container
                container.appendChild(table);
            });
        })
        .catch(error => {
            console.error('Error fetching the API data:', error);
        });
});
