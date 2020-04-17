
const mymap = L.map('statMap')
                            .setView([25.505, 74.09], 3)
                            .setMaxBounds([[-84, -189], [84,190]]);

        const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
            minZoom: 2,
            id: 'mapbox/dark-v10',
            accessToken: 'sk.eyJ1IjoiamFzaG4iLCJhIjoiY2s4cWJhYm03MDFuYjNmdGZwZ3h3aW01YSJ9.JmizXP_rYCf_hJlwBTMpAQ'
        });

        tiles.addTo(mymap)

      
        const statUrl ='https://corona.lmao.ninja/v2/countries';
        getData();
        async function getData() {

            const response = await fetch(statUrl);
            const data = await response.json();

            // console.log(latitude);
            for(let i=0; i < data.length; i++) {
                const {lat:lat, long:lng, flag: countryFlag} = data[i].countryInfo;
                const {tests:testsPerformed, country:country, cases:totalCases, deaths:totalDeaths} = data[i];

                const img = document.createElement('img');
                img.src = countryFlag
                img.width = '200';

                L.circle([lat, lng], Math.sqrt(Number(totalCases))*775, {
                    color: 'red',
                    opacity: 0.7,
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                }).addTo(mymap).bindTooltip(
                        '<a style="font-size:x-large; color:#faf4f4;">' + country  +
                        '<img src = ' + countryFlag +' width ="35" style="padding:0 5px 0 5px; margin-left:7px;">' +   '</a><br><br> ' +
                        '<li style="padding-bottom:0.1vh; font-weight">' + 'Cases: ' + totalCases +  '</li>' + 
                        '<li style="padding-bottom:0.1vh">' + "Deaths: " + totalDeaths + '</li>' +
                        '<li style="padding-bottom:0.1vh">' + "Tests: " + testsPerformed + '</li>'
                        );

                    
            }
        }
