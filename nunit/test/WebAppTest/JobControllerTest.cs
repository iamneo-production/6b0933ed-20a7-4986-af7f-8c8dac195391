using Microsoft.AspNetCore.Mvc;
using Moq;
using WebApp.Controllers;
using WebApp.Infrastructure;
using WebApp.Models;
using System.Collections.Generic;
using System.Linq;
using Xunit;
 
namespace WebAppTest
{
    public class JobControllerTest
    {
        [Fact]
        public void Test_GET_AllJobs()
        {
            // Arrange
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.Jobs).Returns(Multiple());
            var controller = new JobController(mockRepo.Object);
 
            // Act
            var result = controller.Get();
 
            // Assert
            var model = Assert.IsAssignableFrom<IEnumerable<Job>>(result);
            Assert.Equal(3, model.Count());
        }
 
        private static IEnumerable<Job> Multiple()
        {
            var r = new List<Job>();
            r.Add(new Job()
            {
                jobId = 01,
                jobDescription = "ABC",
                jobLocation = "chennai",
                fromDate = new DateTime(2016, 7, 15),
                toDate = new DateTime(2016, 8, 15),
                wagePerDay = "500"
            });
            r.Add(new Job()
            {
                jobId = 02,
                jobDescription = "ABC",
                jobLocation = "chennai",
                fromDate = new DateTime(2016, 7, 15),
                toDate = new DateTime(2016, 8, 15),
                wagePerDay = "500"
            });
            r.Add(new Job()
            {
                jobId = 03,
                jobDescription = "ABC",
                jobLocation = "chennai",
                fromDate = new DateTime(2016, 7, 15),
                toDate = new DateTime(2016, 8, 15),
                wagePerDay = "500"
            });
            return r;
        }

        [Fact]
        public void Test_POST_AddJob()
        {
            // Arrange
            Job r = new Job()
            {
                jobId = 04,
                jobDescription = "ABC",
                jobLocation = "chennai",
                fromDate = new DateTime(2016, 7, 15),
                toDate = new DateTime(2016, 8, 15),
                wagePerDay = "500"
            };
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.AddJob(It.IsAny<Job>())).Returns(r);
            var controller = new JobController(mockRepo.Object);
        
            // Act
            var result = controller.Post(r);
        
            // Assert
            var job = Assert.IsType<Job>(result);
            Assert.Equal(04, job.jobId);
            Assert.Equal("ABC", job.jobDescription);
            Assert.Equal("Chennai", job.jobLocation);
            Assert.Equal(7/15/2016, job.fromDate);
            Assert.Equal(8/15/2016, job.toDate);
            Assert.Equal("500", job.wagePerDay);

        }

        [Fact]
        public void Test_PUT_UpdateJob()
        {
            // Arrange
            Job r = new Job()
            {
                jobId = 01,
                jobDescription = "new ABC",
                jobLocation = "chennai",
                fromDate = new DateTime(2016, 7, 15),
                toDate = new DateTime(2016, 8, 15),
                wagePerDay = "500"
            };
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.UpdateJob(It.IsAny<Job>())).Returns(r);
            var controller = new JobController(mockRepo.Object);
        
            // Act
            var result = controller.Put(r);
        
            // Assert
            var job = Assert.IsType<Job>(result);
            Assert.Equal(01, job.jobId);
            Assert.Equal("new ABC", job.jobDescription);
            Assert.Equal("Chennai", job.jobLocation);
            Assert.Equal(7/15/2016, job.fromDate);
            Assert.Equal(8/15/2016, job.toDate);
            Assert.Equal("500", job.wagePerDay);
        }

        [Fact]
        public void Test_DELETE_Job()
        {
            // Arrange
            var mockRepo = new Mock<IRepository>();
            mockRepo.Setup(repo => repo.DeleteJob(It.IsAny<int>())).Verifiable();
            var controller = new JobController(mockRepo.Object);
        
            // Act
            controller.Delete(3);
        
            // Assert
            mockRepo.Verify();
        }
    }
}