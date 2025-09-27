const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const filePath = path.resolve(__dirname, "../student-code/index.html");
const html = fs.readFileSync(filePath, "utf8");
const { document } = new JSDOM(html).window;

describe("Unit 01 - Lesson 4: HTML Entities", () => {
  test("contains an <h2> heading for using special characters", () => {
    const h2 = document.querySelector("h2");
    expect(h2).not.toBeNull();
    expect(h2.textContent).toMatch(/Using Special Characters/i);
  });

  test("contains a paragraph explaining entities with examples", () => {
    const p = document.querySelector("p");
    expect(p).not.toBeNull();
    expect(p.innerHTML).toMatch(/&lt;/);
    expect(p.innerHTML).toMatch(/&gt;/);
    expect(p.innerHTML).toMatch(/&amp;/);
    expect(p.innerHTML).toMatch(/&copy;/);
    expect(p.innerHTML).toMatch(/&nbsp;/);
    expect(p.innerHTML).toMatch(/&quot;/);
  });

  test("contains separate paragraphs for each entity example", () => {
    const ps = Array.from(document.querySelectorAll("p"));
    const texts = ps.map(el => el.innerHTML);
    expect(texts.some(t => t.includes("&lt;"))).toBe(true);
    expect(texts.some(t => t.includes("&gt;"))).toBe(true);
    expect(texts.some(t => t.includes("&amp;"))).toBe(true);
    expect(texts.some(t => t.includes("&copy;"))).toBe(true);
    expect(texts.some(t => t.includes("&nbsp;"))).toBe(true);
    expect(texts.some(t => t.includes("&quot;"))).toBe(true);
  });

  test("all entity tags are properly displayed", () => {
    const bodyHTML = document.body.innerHTML;
    const entities = ["&lt;", "&gt;", "&amp;", "&copy;", "&nbsp;", "&quot;"];
    entities.forEach(entity => {
      expect(bodyHTML.includes(entity)).toBe(true);
    });
  });
});
