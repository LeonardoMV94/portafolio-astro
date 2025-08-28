class ProjectFilterManager {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.projectCards = document.querySelectorAll('[data-project]');
    this.init();
  }

  init() {
    if (this.filterButtons.length === 0 || this.projectCards.length === 0) {
      console.warn('Project filter elements not found');
      return;
    }
    
    this.attachEventListeners();
    this.setInitialState();
    console.log('Project filters initialized successfully');
  }

  attachEventListeners() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handleFilterClick(button);
      });
    });
  }

  setInitialState() {
    const allButton = document.getElementById('filter-all');
    if (allButton) {
      this.setActiveButton(allButton);
    }
  }

  handleFilterClick(clickedButton) {
    const filterType = clickedButton.getAttribute('data-filter');
    const filterValue = clickedButton.getAttribute('data-value');

    console.log('Filter clicked:', filterType, filterValue);
    
    this.setActiveButton(clickedButton);
    this.filterProjects(filterType, filterValue);
  }

  setActiveButton(activeButton) {
    // Remove active state from all buttons
    this.filterButtons.forEach(btn => {
      btn.classList.remove('active', 'bg-indigo-600', 'text-white', 'border-indigo-600');
      btn.classList.add('border-neutral-300', 'dark:border-neutral-600', 'text-neutral-700', 'dark:text-neutral-300');
    });

    // Add active state to clicked button
    activeButton.classList.add('active', 'bg-indigo-600', 'text-white', 'border-indigo-600');
    activeButton.classList.remove('border-neutral-300', 'dark:border-neutral-600', 'text-neutral-700', 'dark:text-neutral-300');
  }

  filterProjects(filterType, filterValue) {
    let visibleCount = 0;
    
    this.projectCards.forEach(card => {
      try {
        const languages = JSON.parse(card.getAttribute('data-languages') || '[]');
        const frameworks = JSON.parse(card.getAttribute('data-frameworks') || '[]');

        let shouldShow = false;

        if (filterType === 'all') {
          shouldShow = true;
        } else if (filterType === 'language') {
          shouldShow = languages.includes(filterValue);
        } else if (filterType === 'framework') {
          shouldShow = frameworks.includes(filterValue);
        }

        if (shouldShow) {
          // Show the project card
          card.classList.remove('filtered-out');
          card.classList.add('animate-fade-in');
          visibleCount++;
        } else {
          // Hide the project card completely
          card.classList.add('filtered-out');
          card.classList.remove('animate-fade-in');
        }
      } catch (error) {
        console.error('Error parsing project data:', error);
        // Show the card if there's an error parsing data
        card.classList.remove('filtered-out');
        visibleCount++;
      }
    });

    console.log(`Showing ${visibleCount} projects for filter: ${filterType} - ${filterValue}`);
    
    // Update grid layout if needed
    this.updateGridLayout();
  }

  updateGridLayout() {
    // Force a reflow of the grid to ensure proper layout
    const gridContainer = document.querySelector('.grid');
    if (gridContainer) {
      gridContainer.style.display = 'none';
      setTimeout(() => {
        gridContainer.style.display = '';
      }, 10);
    }
  }
}

// Global function to initialize filters
window.initProjectFilters = function() {
  if (typeof ProjectFilterManager !== 'undefined') {
    new ProjectFilterManager();
  }
};

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.initProjectFilters);
} else {
  window.initProjectFilters();
}

// Re-initialize on Astro page transitions
document.addEventListener('astro:page-load', window.initProjectFilters);
