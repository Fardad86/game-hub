document.addEventListener('DOMContentLoaded', async function() {
    const supabaseUrl = 'https://pyecsyykgzeionihrhwi.supabase.co';
    const supabaseKey = 'YOUR_SUPABASE_KEY';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    const gameButtons = document.getElementById('game-buttons');

    async function loadGames() {
        try {
            const { data, error } = await supabase
                .from('games')
                .select('*')
                .order('position', { ascending: true });

            if (error) {
                console.error('Error loading games:', error);
                return;
            }

            updateGameButtons(data);
        } catch (err) {
            console.error('Error fetching games:', err);
        }
    }

    function updateGameButtons(games) {
        gameButtons.innerHTML = '';
        games.forEach(game => {
            const button = document.createElement('a');
            button.href = game.link;
            button.className = 'game-button';
            button.textContent = game.name;
            gameButtons.appendChild(button);
        });
    }

    loadGames();
});
