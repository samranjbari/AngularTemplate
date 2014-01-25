using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CC.Test
{
    [TestClass]
    public class DummyTest
    {
        [TestMethod]
        public void TestMethod1()
        {
            Assert.AreEqual(2, 2);
        }

        [TestMethod]
        public void TestMethod2()
        {
            Assert.AreEqual(1, 1);
        }

        [TestMethod]
        public void TestMethod3()
        {
            Assert.AreEqual(1, 1);
        }
    }
}
