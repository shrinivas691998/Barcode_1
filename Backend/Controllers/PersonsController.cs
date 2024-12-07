using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PersonsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePerson([FromBody] Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Calculate age if not provided
                if (person.Age == 0)
                {
                    person.Age = CalculateAge(person.Dob);
                }

                _context.Persons.Add(person);
                await _context.SaveChangesAsync();
                
                return Ok(new { 
                    success = true, 
                    data = new {
                        id = person.Id,
                        name = person.Name,
                        age = person.Age,
                        dob = person.Dob,
                        sex = person.Sex,
                        barcodeData = person.BarcodeData
                    }
                });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { error = "Error creating person", details = ex.Message });
            }
        }

        [HttpGet("barcode/{barcodeData}")]
        public async Task<IActionResult> GetPersonByBarcode(string barcodeData)
        {
            var person = await _context.Persons
                .FirstOrDefaultAsync(p => p.BarcodeData == barcodeData);

            if (person == null)
            {
                return NotFound(new { error = "Person not found" });
            }

            return Ok(new {
                id = person.Id,
                name = person.Name,
                age = person.Age,
                dob = person.Dob,
                sex = person.Sex,
                barcodeData = person.BarcodeData,
                createdAt = person.CreatedAt
            });
        }

        private int CalculateAge(DateTime dateOfBirth)
        {
            var today = DateTime.Today;
            var age = today.Year - dateOfBirth.Year;
            if (dateOfBirth.Date > today.AddYears(-age)) 
                age--;
            return age;
        }
    }
} 