function process(){
            const semester1Score = parseFloat(document.getElementById('semester1').value);
            const semester2Score = parseFloat(document.getElementById('semester2').value);
            const year = parseInt(document.getElementById('year').value);
            if (isNaN(semester1Score) || isNaN(semester2Score)) {
                document.querySelector('.result-status').textContent = 'Please enter valid scores for both semesters.';
                return;
            }
            let summarise;
            if (year == 1){
                summarise = (semester1Score + semester2Score) / 2;
            } else {
                summarise = (semester1Score + semester2Score * 2) / 3;
            }
            
            document.getElementById('summarise').value = summarise.toFixed(2);
            if (summarise >= 9) {
                document.querySelector('.result-status').innerHTML = 'Giỏi';
                document.querySelector('.result-status').style.color = 'red';
            } else if (summarise >= 8) {
                document.querySelector('.result-status').innerHTML = 'Khá';
                document.querySelector('.result-status').style.color = 'blue';
            } else if (summarise >= 7) {
                document.querySelector('.result-status').innerHTML = 'Trung bình';
                document.querySelector('.result-status').style.color = 'orange';
            } else if (summarise >= 5) {
                document.querySelector('.result-status').innerHTML = 'Yếu';
                document.querySelector('.result-status').style.color = 'yellow';
            } else {
                document.querySelector('.result-status').innerHTML = 'Kém';
                document.querySelector('.result-status').style.color = 'purple';
            }
            
        }

        function cancel(){
            document.getElementById('semester1').value = '';
            document.getElementById('semester2').value = '';
            document.getElementById('year').value = '1';
            document.getElementById('summarise').value = '';
            document.querySelector('.result-status').textContent = '';
        }