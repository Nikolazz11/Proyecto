document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM completamente cargado y analizado");

    const moneyDisplay = document.getElementById('money');
    const seedsDisplay = document.getElementById('seeds');
    const buySeedButton = document.getElementById('buySeedAButton');
    const buyPlotButton = document.getElementById('buyPlotButton');
    const plantButton = document.getElementById('plantButton')

    let money = 200;
    let seeds = 10;
    let plotCount = 3;

    // Variable para saber si estamos en modo de plantar
    let isPlanting = false; 


    // Añadir evento al botón de plantar
    plantButton.addEventListener('click', () => {
        if (isPlanting) {
            isPlanting = false;
            document.body.style.cursor = "default";

        }
        else {
            isPlanting = true;
            document.body.style.cursor = "url('images/seeds.cur'), auto";
        }
    });

    // Añadir evento a todas las parcelas
    const plots = document.querySelectorAll('.plot');


    // PLANTAR SEMILLAS
    plots.forEach(plot => {
        plot.addEventListener('click', () => {
            if (isPlanting) {
                if (!plot.classList.contains('planted') && !plot.classList.contains('not')) {
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
                }
            }
        });
    });






    //COMPRAR SEMILLAS
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


    //COMPRAR PARCELAS
    buyPlotButton.addEventListener('click', () => {
        if (money >= 20) {
            money -= 20;
            moneyDisplay.textContent = money;

            plotCount++;

            // Seleccionar la primera parcela con la clase 'plot not'
            const firstNotPlot = document.querySelector('.plot.not');

            if (firstNotPlot) {
                // Cambiar la clase de 'plot not' a 'plot'
                firstNotPlot.className = 'plot w-24 h-24 m-2 flex justify-center items-center';

                // Añadir el evento de clic para la nueva parcela
                firstNotPlot.addEventListener('click', () => handlePlotClick(firstNotPlot));
            } else {
                alert('No hay parcelas disponibles para comprar.');
            }
        } else {
            alert('No tienes suficiente dinero para comprar una parcela.');
        }
    });




    //MENU LATERAL PARA COMPRAR COSAS
    document.getElementById('buySeed').addEventListener('click', function() {
        var newMenu = document.getElementById('newMenu');
        if (newMenu.classList.contains('hidden')) {
            newMenu.classList.remove('hidden');
        } else {
            newMenu.classList.add('hidden');
        }
    });

    const corralContainer = document.getElementById('corral-container');
    const farmContainer = document.getElementById('farm-container');
    const animalButton = document.getElementById('animalButton');

    animalButton.addEventListener('click', () => {
        // Oculta los plots con una animación
        const plots = document.querySelectorAll('.plot');
        plots.forEach(plot => {
            plot.classList.add('slide-out');
        });

        // Después de la animación, oculta el farmContainer y muestra el corralContainer
        setTimeout(() => {
            farmContainer.classList.add('hidden');
            corralContainer.classList.remove('hidden');
        }, 500); // El tiempo debe coincidir con la duración de la animación
    });

});
