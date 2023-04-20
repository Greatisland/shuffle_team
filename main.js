const gyungjuHard = ['현진', '재형', '석준', '효정', '리안', '새봄', '은영', '유진', '병근']
const gyungjuSoft = ['석한', '선영', '주희', '진솔', '형기', '인우', '민정']

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const randomSadari = (hard, soft) => {
  let [team1, team2, team3] = [shuffleArray(hard.slice()),shuffleArray(soft.slice()),[]]
  const requiredMembers = ['석준', '석한', '민정', '재형', '효정', '현진']
  if(team1.length>team2.length){
    team3 = team1.splice(0,team1.length-team2.length)
  }else if(team2.length>team1.length){
    team3 = team2.splice(0,team2.length-team1.length)
  }
  let total = [team1, team2, team3]

  const checkEqual = (a,b,c) => {
    const maxTeamSize = Math.max(a.length, b.length, c.length)
    const minTeamSize = Math.min(a.length, b.length, c.length)
    const result = maxTeamSize - minTeamSize > 1 && minTeamSize > 0
    return result
  }


  while(checkEqual(team1,team2,team3)){
    total.sort((a,b) => a.length - b.length)
    total[0].push(total[2].pop())
  }
  total.forEach((team, i, total) => {
    let random = Math.floor(Math.random() * 2)
    const checkCouple = (team) => team.includes('재형') && team.includes('효정')
    if(checkCouple(team)){
      const other = team.splice(team.findIndex(human => human === '재형'), 1)[0]
      let lest = total.filter((team, index) => index !== i)
      lest[random].push(other)
      team.push(lest[random].shift())
    }

    const checkManage = (team) => requiredMembers.some(member => team.includes(member))
    if(!checkManage(team)){
      let lest = total.filter((team, index) => index !== i)
      lest.forEach((lestTeam) => {
        requiredMembers.forEach(member => {
          const manageIndex = lestTeam.findIndex(human => human === member)
          if(manageIndex !== -1){
            team.push(lestTeam.splice(manageIndex, 1)[0])
          }
        })
      })
    }
  })

  const team1Text = document.querySelector('.team1')
  const team2Text = document.querySelector('.team2')
  const team3Text = document.querySelector('.team3')

  team1Text.textContent = '1팀:' + team1
  team2Text.textContent = '2팀:' + team2
  team3Text.textContent = '3팀:' + team3
}

 document.querySelector('.button').addEventListener('click',() => randomSadari(gyungjuHard,gyungjuSoft))

