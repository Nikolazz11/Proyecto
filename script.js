document.addEventListener('DOMContentLoaded', (event) => {
    const farmContainer = document.getElementById('farm');
    const moneyDisplay = document.getElementById('money');
    const seedsDisplay = document.getElementById('seeds');
    const buySeedButton = document.getElementById('buySeedButton');
    const buyPlotButton = document.getElementById('buyPlotButton');

    let money = 100;
    let seeds = 10;
    let plotCount = 3;

    buySeedButton.addEventListener('click', () => {
        if (money >= 5) {
            money -= 5;
            seeds++;
            moneyDisplay.textContent = money;
            seedsDisplay.textContent = seeds;
        } else {
            alert('No tienes suficiente dinero para comprar una semilla.');
        }
    });

    buyPlotButton.addEventListener('click', () => {
        if (money >= 20) {
            money -= 20;
            moneyDisplay.textContent = money;

            plotCount++;
            const newPlot = document.createElement('div');
            newPlot.classList.add('plot', 'w-24', 'h-24', 'border-2', 'border-black', 'm-2', 'flex', 'justify-center', 'items-center');
            newPlot.id = `plot${plotCount}`;
            farmContainer.appendChild(newPlot);

            // Añadir el evento de clic para la nueva parcela
            newPlot.addEventListener('click', () => handlePlotClick(newPlot));
        } else {
            alert('No tienes suficiente dinero para comprar una parcela.');
        }
    });

    const handlePlotClick = (plot) => {
        if (!plot.classList.contains('planted')) {
            // Si la parcela no está plantada, mostrar mensaje para plantar
            if (seeds > 0) {
                const plantOption = confirm('¿Quieres plantar una semilla aquí?');
                if (plantOption) {
                    plot.classList.add('planted');
                    seeds--;
                    seedsDisplay.textContent = seeds;

                    // Simular crecimiento de la planta después de 5 segundos
                    setTimeout(() => {
                        plot.dataset.grown = 'true'; // Marcar la parcela como crecida
                    }, 5000); // 5000 milisegundos = 5 segundos
                }
            } else {
                alert('No tienes suficientes semillas para plantar.');
            }
        } else {
            // Si la parcela está plantada, mostrar mensaje para cosechar
            if (plot.dataset.grown === 'true') {
                const harvestOption = confirm('¿Quieres cosechar aquí?');
                if (harvestOption) {
                    plot.classList.remove('planted');
                    plot.dataset.grown = 'false'; // Reiniciar el estado de crecimiento
                    money += 10; // Ganas $10 por cada parcela cosechada
                    moneyDisplay.textContent = money;
                }
            } else {
                alert('La planta está creciendo, no puedes cosechar todavía.');
            }
        }
    };

    // Añadir el evento de clic a las parcelas iniciales
    const initialPlots = document.querySelectorAll('.plot');
    initialPlots.forEach(plot => plot.addEventListener('click', () => handlePlotClick(plot)));
});
