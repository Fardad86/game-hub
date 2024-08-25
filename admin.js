import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZWNzeXlrZ3plaW9uaWhyaHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1MjIzNzMsImV4cCI6MjA0MDA5ODM3M30.oBNxX9Hl-89r_aCrzLJwbkdtdJB-e7rhOmhZd0q9RUc';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const createGameForm = document.getElementById('create-game-form');
    const updateGameForm = document.getElementById('update-game-form');
    const deleteGameForm = document.getElementById('delete-game-form');
    const updateGameSelect = document.getElementById('update-game-select');
    const deleteGameSelect = document.getElementById('delete-game-select');
    const gameList = document.getElementById('game-list');

    async function loadGames() {
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .order('position', { ascending: true });

        if (error) {
            console.error('Error loading games:', error);
        } else {
            populateGameSelects(data);
            updateGameList(data);
        }
    }

    function populateGameSelects(games) {
        updateGameSelect.innerHTML = '';
        deleteGameSelect.innerHTML = '';
        games.forEach(game => {
            const option1 = document.createElement('option');
            option1.value = game.id;
            option1.textContent = game.name;
            updateGameSelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = game.id;
            option2.textContent = game.name;
            deleteGameSelect.appendChild(option2);
        });
    }

    function updateGameList(games) {
        gameList.innerHTML = '';
        games.forEach(game => {
            const gameDiv = document.createElement('div');
            gameDiv.textContent = `Name: ${game.name}, Link: ${game.link}, Position: ${game.position}`;
            gameList.appendChild(gameDiv);
        });
    }

    createGameForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('create-game-name').value;
        const link = document.getElementById('create-game-link').value;
        const position = parseInt(document.getElementById('create-game-position').value, 10);

        const { data, error } = await supabase
            .from('games')
            .insert([{ name, link, position }]);

        if (error) {
            console.error('Error creating game:', error);
        } else {
            loadGames();
            createGameForm.reset();
        }
    });

    updateGameForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = updateGameSelect.value;
        const name = document.getElementById('update-game-name').value;
        const link = document.getElementById('update-game-link').value;
        const position = parseInt(document.getElementById('update-game-position').value, 10);

        const { error } = await supabase
            .from('games')
            .update({ name, link, position })
            .eq('id', id);

        if (error) {
            console.error('Error updating game:', error);
        } else {
            loadGames();
            updateGameForm.reset();
        }
    });

    deleteGameForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = deleteGameSelect.value;

        const { error } = await supabase
            .from('games')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting game:', error);
        } else {
            loadGames();
            deleteGameForm.reset();
        }
    });

    loadGames();
});
