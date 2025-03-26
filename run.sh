tmux new-session -d -s rolodex
tmux send-keys -t rolodex:0.0 "cd rest && code . && npm run dev" Enter

tmux split-window -h -t rolodex:0
tmux send-keys -t rolodex:0.1 "cd webapp && code . && npm run dev" Enter

MONGO_CMD="docker run -p 127.0.0.1:27017:27017 -v /Users/jkent/mongo-data:/data/db mongo"
tmux split-window -h -t rolodex:0
tmux send-keys -t rolodex:0.2 "$MONGO_CMD" Enter

tmux attach-session -t rolodex
