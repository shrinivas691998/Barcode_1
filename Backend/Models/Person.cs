using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Person
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [Range(0, 150)]
        public int Age { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Dob { get; set; }

        [Required]
        [StringLength(10)]
        public string Sex { get; set; }

        [Required]
        [StringLength(255)]
        public string BarcodeData { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
} 