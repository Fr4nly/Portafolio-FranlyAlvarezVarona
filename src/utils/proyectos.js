////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////TOGGLE DE PROYECTOS EN LA SECCION DE PROYECTOS/////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function toggleProject(card) {
    const collapsedView = card.querySelector('.collapsed-view');
    const expandedView = card.querySelector('.expanded-view');
    const isExpanded = !expandedView.classList.contains('hidden');

    if (isExpanded) {
        // Colapsar
        expandedView.classList.remove('opacity-100');
        expandedView.classList.add('opacity-0', 'pointer-events-none');

        setTimeout(() => {
            expandedView.classList.add('hidden');

            collapsedView.classList.remove(
                'hidden',
                'opacity-0'
            );
            collapsedView.classList.add('opacity-100');
        }, 300);

    } else {
        // Expandir
        // Expandir
        collapsedView.classList.remove('opacity-100');
        collapsedView.classList.add('opacity-0');

        setTimeout(() => {
            collapsedView.classList.add('hidden');

            expandedView.classList.remove(
                'hidden',
                'opacity-0',
                'pointer-events-none'
            );
            expandedView.classList.add(
                'opacity-100',
                'pointer-events-auto'
            );
        }, 300);

    }
}

document.addEventListener('click', (e) => {
    // ❌ Si el click viene de un botón interno, no hacer toggle
    if (e.target.closest('[data-ignore-toggle]')) return;

    const card = e.target.closest('[data-project-card]');
    if (!card) return;

    toggleProject(card);
});