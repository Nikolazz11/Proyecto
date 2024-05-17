document.addEventListener('DOMContentLoaded', (event) => {
    const farmContainer = document.getElementById('farm');
    const moneyDisplay = document.getElementById('money');
    const seedsADisplay = document.getElementById('seedsA');
    const seedsBDisplay = document.getElementById('seedsB');
    const buySeedAButton = document.getElementById('buySeedAButton');
    const buySeedBButton = document.getElementById('buySeedBButton');
    const buyPlotButton = document.getElementById('buyPlotButton');

    let money = 100;
    let seedsA = 10;
    let seedsB = 5;
    let plotCount = 3;

    const updateTimer = (plot, remainingTime) => {
        let timer = plot.querySelector('.timer');
        if (!timer) {
            timer = document.createElement('div');
            timer.classList.add('timer');
            plot.appendChild(timer);
        }
        timer.textContent = `${remainingTime}s`;
    };

    const startGrowthTimer = (plot, growthTime, plantType) => {
        let remainingTime = growthTime / 1000; // Convertir a segundos
        updateTimer(plot, remainingTime);

        const interval = setInterval(() => {
            remainingTime--;
            updateTimer(plot, remainingTime);

            if (remainingTime <= 0) {
                clearInterval(interval);
                plot.dataset.grown = 'true';
                plot.dataset.type = plantType;
                const timer = plot.querySelector('.timer');
                if (timer) {
                    plot.removeChild(timer);
                }
            }
        }, 1000);
    };

    buySeedAButton.addEventListener('click', () => {
        if (money >= 5) {
            money -= 5;
            seedsA++;
            moneyDisplay.textContent = money;
            seedsADisplay.textContent = seedsA;
        } else {
            alert('No tienes suficiente dinero para comprar una semilla A.');
        }
    });

    buySeedBButton.addEventListener('click', () => {
        if (money >= 10) {
            money -= 10;
            seedsB++;
            moneyDisplay.textContent = money;
            seedsBDisplay.textContent = seedsB;
        } else {
            alert('No tienes suficiente dinero para comprar una semilla B.');
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
        if (!plot.classList.contains('plantedA') && !plot.classList.contains('plantedB')) {
            // Si la parcela no está plantada, preguntar qué tipo de semilla plantar
            if (seedsA > 0 || seedsB > 0) {
                const plantOption = prompt('¿Quieres plantar una semilla aquí? Ingresa "A" para semilla A o "B" para semilla B.');
                if (plantOption === 'A' && seedsA > 0) {
                    plot.classList.add('plantedA');
                    seedsA--;
                    seedsADisplay.textContent = seedsA;

                    // Simular crecimiento de la planta A después de 5 segundos
                    startGrowthTimer(plot, 5000, 'A');
                } else if (plantOption === 'B' && seedsB > 0) {
                    plot.classList.add('plantedB');
                    seedsB--;
                    seedsBDisplay.textContent = seedsB;

                    // Simular crecimiento de la planta B después de 10 segundos
                    startGrowthTimer(plot, 10000, 'B');
                } else {
                    alert('No tienes suficientes semillas para plantar este tipo.');
                }
            } else {
                alert('No tienes suficientes semillas para plantar.');
            }
        } else {
            // Si la parcela está plantada, mostrar mensaje para cosechar
            if (plot.dataset.grown === 'true') {
                const harvestOption = confirm('¿Quieres cosechar aquí?');
                if (harvestOption) {
                    const plantType = plot.dataset.type;
                    if (plantType === 'A') {
                        money += 10; // Ganas $10 por cada parcela cosechada de tipo A
                    } else if (plantType === 'B') {
                        money += 20; // Ganas $20 por cada parcela cosechada de tipo B
                    }
                    plot.classList.remove('plantedA', 'plantedB');
                    plot.dataset.grown = 'false'; // Reiniciar el estado de crecimiento
                    plot.dataset.type = ''; // Limpiar el tipo de planta
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
