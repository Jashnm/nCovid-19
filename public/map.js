const mymap = L.map('statMap')
                            .setView([25.505, 74.09], 3)
                            .setMaxBounds([[-84, -189], [84,190]]);

        const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            minZoom: 2,
            id: 'mapbox/dark-v10',

            accessToken: 'sk.eyJ1IjoiamFzaG4iLCJhIjoiY2s4cWJhYm03MDFuYjNmdGZwZ3h3aW01YSJ9.JmizXP_rYCf_hJlwBTMpAQ'
        });

        tiles.addTo(mymap)

      
        const statUrl ='https://corona.lmao.ninja/countries';
        getData();
        async function getData() {

            const response = await fetch(statUrl);
            const data = await response.json();

            // console.log(latitude);
            for(let i=0; i < data.length; i++) {
                const {lat:lat, long:lng} = data[i].countryInfo;
                const {tests:testsPerformed, country:country, cases:totalCases, deaths:totalDeaths} = data[i];

                L.circle([lat, lng], Number(totalCases)*5, {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5
                }).addTo(mymap).bindPopup(
                        '<strong>' + country  + '</strong>' + '<br>' + "Cases: " + totalCases + '<br>' + "Deaths: " + totalDeaths + '<br>' + "Tests: " + testsPerformed
                        );
            }
        }
