'use strict';

class ThemeSwitcher {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.btnIcon = document.querySelector('.btn-icon');
        this.body = document.body;
        this.init();
    }

    init() {
        this.loadSavedTheme();
        this.bindEvents();
        this.animateOnLoad();
    }

    bindEvents() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Tecla "T" para alternar tema (acessibilidade)
        document.addEventListener('keydown', (e) => {
            if (e.key === 't' || e.key === 'T') {
                this.toggleTheme();
            }
        });
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark-theme';
        this.body.className = savedTheme;
        this.updateButtonText();
    }

    toggleTheme() {
        const isDark = this.body.classList.contains('dark-theme');
        
        // Animação de transição
        this.animateTransition();
        
        setTimeout(() => {
            if (isDark) {
                this.body.classList.replace('dark-theme', 'light-theme');
            } else {
                this.body.classList.replace('light-theme', 'dark-theme');
            }
            
            this.updateButtonText();
            this.saveTheme();
            this.logThemeChange();
        }, 300);
    }

    animateTransition() {
        this.body.style.opacity = '0.7';
        setTimeout(() => {
            this.body.style.opacity = '1';
        }, 300);
    }

    updateButtonText() {
        const isDark = this.body.classList.contains('dark-theme');
        this.btnIcon.textContent = isDark ? '🌙' : '☀️';
        
        // Atualiza aria-label para acessibilidade
        this.themeToggle.setAttribute('aria-label', 
            `Switch to ${isDark ? 'light' : 'dark'} theme`);
    }

    saveTheme() {
        localStorage.setItem('theme', this.body.className);
    }

    logThemeChange() {
        console.log(`🎨 Theme changed to: ${this.body.className}`);
        console.log('💾 Theme saved to localStorage');
    }

    animateOnLoad() {
        // Animação sequencial para os itens da task list
        const taskItems = document.querySelectorAll('.task-item');
        taskItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
});