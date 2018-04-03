const Nightmare = require("nightmare")
const nightmare = Nightmare({ show: false })
const chai = require("chai")
const expect = chai.expect
const { Given, When, Then, AfterAll } = require("cucumber")

const pageUrl = "http://localhost:4200"

AfterAll(() => nightmare.end())

Given("i am on an event page", (done) => {
    nightmare.goto(pageUrl).then(() => done())
})

When("i type my name", (done) => {
    nightmare.type(".form-control", "my name").then(() => done())
})

When("I click on je viens", (done) => {
    nightmare.click("button.btn:nth-child(3)").then(() => done())
})

Given("my name is in the participant list", (done) => {
    nightmare
        .type(".form-control", "my name")
        .click("button.btn:nth-child(3)")
        .then(() => done())
})

Then("my name must be in the participant list", (done) => {
    nightmare.evaluate(() => {
        const cells = document
            .querySelector("div.flex_user_list:nth-child(1) > app-list-users:nth-child(1) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1)")
            .querySelectorAll(".user_cell")
        const names = []
        for (const cell of cells) {
            names.push(cell.querySelector("span").innerHTML)
        }
        return names
    })
        .then((names) => {
            expect(names.find((name) => name === "my name")).to.not.be.eql(null)
            done()
        })
})

When("I click on my name", (done) => {
    nightmare.evaluate(() => {
        const cells = document.querySelectorAll(".user_cell")
        let myNameCell = null
        for (const cell of cells) {
            if (cell.querySelector("span").innerHTML === "my name") {
                myNameCell = cell
            }
        }
        const me = document.createEvent("MouseEvents")
        me.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        myNameCell.dispatchEvent(me)
    }).then(() => done())
})

When("i click on je ne viens pas", (done) => {
    nightmare.click("button.btn:nth-child(5)").then(() => done())
})

Then("my name is no longer in the participants list", (done) => {
    nightmare.evaluate(() => {
        const cells = document
            .querySelector("div.flex_user_list:nth-child(1) > app-list-users:nth-child(1) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1)")
            .querySelectorAll(".user_cell")
        const names = []
        for (const cell of cells) {
            names.push(cell.querySelector("span").innerHTML)
        }
        return names
    })
        .then((names) => {
            expect(names.find((name) => name === "my name")).to.be.eql(undefined)
            done()
        })
})

Then("my name is in the not participant list", (done) => {
    nightmare.evaluate(() => {
        const cells = document
            .querySelector("div.flex_user_list:nth-child(3) > app-list-users:nth-child(1) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1)")
            .querySelectorAll(".user_cell")
        const names = []
        for (const cell of cells) {
            names.push(cell.querySelector("span").innerHTML)
        }
        return names
    })
        .then((names) => {
            expect(names.find((name) => name === "my name")).to.not.be.eql(undefined)
            done()
        })

    When("i click on the remove button next my name", function (done) {
        nightmare.evaluate(() => {
            const cells = document.querySelectorAll(".user_cell")
            let myNameCell = null
            for (const cell of cells) {
                if (cell.querySelector("span").innerHTML === "my name") {
                    myNameCell = cell
                }
            }
            const me = document.createEvent("MouseEvents")
            me.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            const actionCell = myNameCell.parentNode.querySelector(".action_cell")
            actionCell.dispatchEvent(me)
        }).then(() => done())
    })
})
