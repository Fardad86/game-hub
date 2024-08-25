import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async () => {
    const { data: games, error } = await supabase
        .from('games')
        .select('*')
        .order('position', { ascending: true });

    if (error) {
        console.error('Error loading games:', error);
    } else {
        displayGames(games);
    }
});

function displayGames(games) {
    const gameButtons = document.getElementById('game-buttons');
    gameButtons.innerHTML = '';

    games.forEach(game => {
        const button = document.createElement('button');
        button.textContent = game.name;
        button.onclick = () => window.location.href = game.link;
        gameButtons.appendChild(button);
    });
}
